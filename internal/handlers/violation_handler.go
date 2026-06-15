package handlers

import (
	"strconv"
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"

	"github.com/gin-gonic/gin"
)

func GetViolations(c *gin.Context) {

	start := time.Now()

	vehicleID := c.Query("vehicle_id")
	geofenceID := c.Query("geofence_id")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")

	limit := 50

	if limitParam := c.Query("limit"); limitParam != "" {

		parsedLimit, err := strconv.Atoi(limitParam)

		if err == nil {

			if parsedLimit > 500 {
				parsedLimit = 500
			}

			if parsedLimit > 0 {
				limit = parsedLimit
			}
		}
	}

	var violations []models.Violation

	query := config.DB.Model(&models.Violation{})

	if vehicleID != "" {
		query = query.Where("vehicle_id = ?", vehicleID)
	}

	if geofenceID != "" {
		query = query.Where("geofence_id = ?", geofenceID)
	}

	if startDate != "" {

		if parsedStart, err := time.Parse(time.RFC3339, startDate); err == nil {
			query = query.Where("timestamp >= ?", parsedStart)
		}
	}

	if endDate != "" {

		if parsedEnd, err := time.Parse(time.RFC3339, endDate); err == nil {
			query = query.Where("timestamp <= ?", parsedEnd)
		}
	}

	var totalCount int64

	query.Count(&totalCount)

	if err := query.
		Order("timestamp desc").
		Limit(limit).
		Find(&violations).Error; err != nil {

		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"violations":  violations,
		"total_count": totalCount,
	})
}
