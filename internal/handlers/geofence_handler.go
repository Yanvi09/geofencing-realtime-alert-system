package handlers

import (
	"encoding/json"
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateGeofenceRequest struct {
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Coordinates [][]float64 `json:"coordinates"`
	Category    string      `json:"category"`
}

func CreateGeofence(c *gin.Context) {

	start := time.Now()

	var req CreateGeofenceRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	coordsJSON, _ := json.Marshal(req.Coordinates)

	geofence := models.Geofence{
		ID:          uuid.New().String(),
		Name:        req.Name,
		Description: req.Description,
		Category:    req.Category,
		Coordinates: string(coordsJSON),
		Status:      "active",
	}

	if err := config.DB.Create(&geofence).Error; err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"id":     geofence.ID,
		"name":   geofence.Name,
		"status": geofence.Status,
	})
}

func GetGeofences(c *gin.Context) {

	start := time.Now()

	println("GET GEOFENCES HIT")

	var geofences []models.Geofence

	err := config.DB.Find(&geofences).Error

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"geofences": geofences,
	})
}
