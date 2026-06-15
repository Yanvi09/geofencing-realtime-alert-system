package handlers

import (
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type AlertRequest struct {
	GeofenceID string `json:"geofence_id"`
	VehicleID  string `json:"vehicle_id"`
	EventType  string `json:"event_type"`
}

func CreateAlert(c *gin.Context) {

	start := time.Now()

	var req AlertRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	if req.GeofenceID == "" {
		c.JSON(400, gin.H{
			"error": "geofence_id is required",
		})
		return
	}

	if req.EventType != "entry" &&
		req.EventType != "exit" &&
		req.EventType != "both" {

		c.JSON(400, gin.H{
			"error": "event_type must be entry, exit or both",
		})
		return
	}

	var geofence models.Geofence

	if err := config.DB.
		First(&geofence, "id = ?", req.GeofenceID).
		Error; err != nil {

		c.JSON(404, gin.H{
			"error": "geofence not found",
		})
		return
	}

	var vehicle models.Vehicle

	vehicleNumber := ""

	// vehicle_id is OPTIONAL per assessment
	if req.VehicleID != "" {

		if err := config.DB.
			First(&vehicle, "id = ?", req.VehicleID).
			Error; err != nil {

			c.JSON(404, gin.H{
				"error": "vehicle not found",
			})
			return
		}

		vehicleNumber = vehicle.VehicleNumber
	}

	alert := models.Alert{
		ID:            uuid.New().String(),
		GeofenceID:    req.GeofenceID,
		VehicleID:     req.VehicleID,
		EventType:     req.EventType,
		Status:        "active",
		VehicleNumber: vehicleNumber,
		GeofenceName:  geofence.Name,
	}

	if err := config.DB.Create(&alert).Error; err != nil {

		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"alert_id":    alert.ID,
		"geofence_id": alert.GeofenceID,
		"vehicle_id":  alert.VehicleID,
		"event_type":  alert.EventType,
		"status":      alert.Status,
	})
}

func GetAlerts(c *gin.Context) {

	start := time.Now()

	vehicleID := c.Query("vehicle_id")
	geofenceID := c.Query("geofence_id")

	var alerts []models.Alert

	query := config.DB.Model(&models.Alert{})

	if vehicleID != "" {
		query = query.Where("vehicle_id = ?", vehicleID)
	}

	if geofenceID != "" {
		query = query.Where("geofence_id = ?", geofenceID)
	}

	query.
		Order("created_at desc").
		Find(&alerts)

	utils.SuccessResponse(c, start, gin.H{
		"alerts": alerts,
	})
}
