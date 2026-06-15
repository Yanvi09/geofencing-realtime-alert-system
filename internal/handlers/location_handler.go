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

		println("JSON ERROR:", err.Error())

		c.JSON(400, gin.H{
			"error": err.Error(),
		})

		return
	}

	timestamp, _ := time.Parse(time.RFC3339, req.Timestamp)

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

		json.Unmarshal([]byte(geofence.Coordinates), &polygon)

		if utils.IsPointInsidePolygon(
			req.Latitude,
			req.Longitude,
			polygon,
		) {

			currentGeofences = append(currentGeofences, gin.H{
				"geofence_id":   geofence.ID,
				"geofence_name": geofence.Name,
				"status":        "inside",
			})

			var vehicle models.Vehicle

			config.DB.First(&vehicle, "id = ?", req.VehicleID)

			violation := models.Violation{
				ID:            uuid.New().String(),
				VehicleID:     vehicle.ID,
				VehicleNumber: vehicle.VehicleNumber,
				GeofenceID:    geofence.ID,
				GeofenceName:  geofence.Name,
				EventType:     "entry",
				Latitude:      req.Latitude,
				Longitude:     req.Longitude,
				Timestamp:     timestamp,
			}

			config.DB.Create(&violation)
			websocket.Broadcast(gin.H{
				"vehicle":   vehicle.VehicleNumber,
				"geofence":  geofence.Name,
				"event":     "entry",
				"latitude":  req.Latitude,
				"longitude": req.Longitude,
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

	var location models.Location

	err := config.DB.
		Where("vehicle_id = ?", vehicleID).
		Order("created_at desc").
		First(&location).Error

	if err != nil {

		c.JSON(404, gin.H{
			"error": "location not found",
		})

		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"vehicle_id":       vehicleID,
		"current_location": location,
	})
}
