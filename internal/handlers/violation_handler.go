package handlers

import (
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"

	"github.com/gin-gonic/gin"
)

func GetViolations(c *gin.Context) {

	start := time.Now()

	var violations []models.Violation

	config.DB.Find(&violations)

	utils.SuccessResponse(c, start, gin.H{
		"violations":  violations,
		"total_count": len(violations),
	})
}
