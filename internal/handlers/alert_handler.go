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

	alert := models.Alert{
		ID:         uuid.New().String(),
		GeofenceID: req.GeofenceID,
		VehicleID:  req.VehicleID,
		EventType:  req.EventType,
		Status:     "active",
	}

	config.DB.Create(&alert)

	utils.SuccessResponse(c, start, gin.H{
		"alert_id": alert.ID,
		"status":   alert.Status,
	})
}

func GetAlerts(c *gin.Context) {

	start := time.Now()

	var alerts []models.Alert

	config.DB.Find(&alerts)

	utils.SuccessResponse(c, start, gin.H{
		"alerts": alerts,
	})
}
