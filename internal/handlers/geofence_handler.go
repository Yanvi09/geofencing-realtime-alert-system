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

	if req.Name == "" {
		c.JSON(400, gin.H{
			"error": "name is required",
		})
		return
	}

	if len(req.Coordinates) < 4 {
		c.JSON(400, gin.H{
			"error": "minimum 4 coordinate points required",
		})
		return
	}

	validCategory := map[string]bool{
		"delivery_zone":   true,
		"restricted_zone": true,
		"toll_zone":       true,
		"customer_area":   true,
	}

	if !validCategory[req.Category] {
		c.JSON(400, gin.H{
			"error": "invalid category",
		})
		return
	}

	// validate coordinates
	for _, point := range req.Coordinates {

		if len(point) != 2 {
			c.JSON(400, gin.H{
				"error": "invalid coordinate format",
			})
			return
		}

		lat := point[0]
		lng := point[1]

		if lat < -90 || lat > 90 {
			c.JSON(400, gin.H{
				"error": "invalid latitude",
			})
			return
		}

		if lng < -180 || lng > 180 {
			c.JSON(400, gin.H{
				"error": "invalid longitude",
			})
			return
		}
	}

	// polygon must be closed
	first := req.Coordinates[0]
	last := req.Coordinates[len(req.Coordinates)-1]

	if first[0] != last[0] || first[1] != last[1] {
		c.JSON(400, gin.H{
			"error": "polygon must be closed (first and last coordinate must match)",
		})
		return
	}

	coordsJSON, err := json.Marshal(req.Coordinates)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

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

	category := c.Query("category")

	var geofences []models.Geofence

	query := config.DB.Model(&models.Geofence{})

	if category != "" {
		query = query.Where("category = ?", category)
	}

	if err := query.
		Order("created_at desc").
		Find(&geofences).Error; err != nil {

		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"geofences": geofences,
	})
}
