package handlers

import (
	"encoding/json"
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"
	"geofencing-system/internal/websocket"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type LocationRequest struct {
	VehicleID string  `json:"vehicle_id"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Timestamp string  `json:"timestamp"`
}

func UpdateVehicleLocation(c *gin.Context) {

	start := time.Now()

	var req LocationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	if req.VehicleID == "" {
		c.JSON(400, gin.H{
			"error": "vehicle_id is required",
		})
		return
	}

	if req.Latitude < -90 || req.Latitude > 90 {
		c.JSON(400, gin.H{
			"error": "invalid latitude",
		})
		return
	}

	if req.Longitude < -180 || req.Longitude > 180 {
		c.JSON(400, gin.H{
			"error": "invalid longitude",
		})
		return
	}

	timestamp, err := time.Parse(time.RFC3339, req.Timestamp)

	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid timestamp format",
		})
		return
	}

	var vehicle models.Vehicle

	if err := config.DB.First(&vehicle, "id = ?", req.VehicleID).Error; err != nil {
		c.JSON(404, gin.H{
			"error": "vehicle not found",
		})
		return
	}

	location := models.Location{
		ID:        uuid.New().String(),
		VehicleID: req.VehicleID,
		Latitude:  req.Latitude,
		Longitude: req.Longitude,
		Timestamp: timestamp,
	}

	config.DB.Create(&location)

	var geofences []models.Geofence
	config.DB.Find(&geofences)

	var currentGeofences []gin.H

	for _, geofence := range geofences {

		var polygon [][]float64

		if err := json.Unmarshal([]byte(geofence.Coordinates), &polygon); err != nil {
			continue
		}

		isInside := utils.IsPointInsidePolygon(
			req.Latitude,
			req.Longitude,
			polygon,
		)

		if isInside {
			currentGeofences = append(currentGeofences, gin.H{
				"geofence_id":   geofence.ID,
				"geofence_name": geofence.Name,
				"status":        "inside",
			})
		}

		var state models.GeofenceState

		err := config.DB.
			Where(
				"vehicle_id = ? AND geofence_id = ?",
				vehicle.ID,
				geofence.ID,
			).
			First(&state).Error

		previousInside := false

		if err == nil {
			previousInside = state.IsInside
		} else {
			state = models.GeofenceState{
				ID:         uuid.New().String(),
				VehicleID:  vehicle.ID,
				GeofenceID: geofence.ID,
				IsInside:   false,
			}

			config.DB.Create(&state)
		}

		eventType := ""

		if !previousInside && isInside {
			eventType = "entry"
		}

		if previousInside && !isInside {
			eventType = "exit"
		}

		state.IsInside = isInside
		state.UpdatedAt = time.Now()

		config.DB.Save(&state)

		if eventType == "" {
			continue
		}

		violation := models.Violation{
			ID:            uuid.New().String(),
			VehicleID:     vehicle.ID,
			VehicleNumber: vehicle.VehicleNumber,
			GeofenceID:    geofence.ID,
			GeofenceName:  geofence.Name,
			EventType:     eventType,
			Latitude:      req.Latitude,
			Longitude:     req.Longitude,
			Timestamp:     timestamp,
		}

		config.DB.Create(&violation)

		var alertRules []models.Alert

		config.DB.
			Where("geofence_id = ?", geofence.ID).
			Find(&alertRules)

		for _, rule := range alertRules {

			if rule.VehicleID != "" &&
				rule.VehicleID != vehicle.ID {
				continue
			}

			if rule.EventType != "both" &&
				rule.EventType != eventType {
				continue
			}

			rule.Status = "triggered"
			rule.VehicleNumber = vehicle.VehicleNumber
			rule.GeofenceName = geofence.Name
			rule.TriggeredAt = time.Now()

			config.DB.Save(&rule)

			websocket.Broadcast(gin.H{
				"event_id":   uuid.New().String(),
				"event_type": eventType,
				"timestamp":  time.Now().UTC(),

				"vehicle": gin.H{
					"vehicle_id":     vehicle.ID,
					"vehicle_number": vehicle.VehicleNumber,
					"driver_name":    vehicle.DriverName,
				},

				"geofence": gin.H{
					"geofence_id":   geofence.ID,
					"geofence_name": geofence.Name,
					"category":      geofence.Category,
				},

				"location": gin.H{
					"latitude":  req.Latitude,
					"longitude": req.Longitude,
				},
			})
		}
	}

	utils.SuccessResponse(c, start, gin.H{
		"vehicle_id":        req.VehicleID,
		"location_updated":  true,
		"current_geofences": currentGeofences,
	})
}
func GetVehicleLocation(c *gin.Context) {

	start := time.Now()

	vehicleID := c.Param("vehicle_id")

	var vehicle models.Vehicle

	if err := config.DB.
		First(&vehicle, "id = ?", vehicleID).Error; err != nil {

		c.JSON(404, gin.H{
			"error": "vehicle not found",
		})

		return
	}

	var location models.Location

	if err := config.DB.
		Where("vehicle_id = ?", vehicleID).
		Order("created_at desc").
		First(&location).Error; err != nil {

		c.JSON(404, gin.H{
			"error": "location not found",
		})

		return
	}

	var geofences []models.Geofence
	config.DB.Find(&geofences)

	var currentGeofences []gin.H

	for _, geofence := range geofences {

		var polygon [][]float64

		if err := json.Unmarshal(
			[]byte(geofence.Coordinates),
			&polygon,
		); err != nil {
			continue
		}

		if utils.IsPointInsidePolygon(
			location.Latitude,
			location.Longitude,
			polygon,
		) {

			currentGeofences = append(currentGeofences, gin.H{
				"geofence_id":   geofence.ID,
				"geofence_name": geofence.Name,
				"category":      geofence.Category,
			})
		}
	}

	utils.SuccessResponse(c, start, gin.H{
		"vehicle_id":     vehicle.ID,
		"vehicle_number": vehicle.VehicleNumber,

		"current_location": gin.H{
			"latitude":  location.Latitude,
			"longitude": location.Longitude,
			"timestamp": location.Timestamp,
		},

		"current_geofences": currentGeofences,
	})
}
