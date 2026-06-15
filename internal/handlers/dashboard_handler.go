package handlers

import (
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"

	"github.com/gin-gonic/gin"
)

func GetDashboardStats(c *gin.Context) {

	start := time.Now()

	var vehicleCount int64
	var geofenceCount int64
	var violationCount int64
	var alertCount int64

	config.DB.Model(&models.Vehicle{}).Count(&vehicleCount)
	config.DB.Model(&models.Geofence{}).Count(&geofenceCount)
	config.DB.Model(&models.Violation{}).Count(&violationCount)
	config.DB.Model(&models.Alert{}).Count(&alertCount)

	utils.SuccessResponse(c, start, gin.H{
		"vehicles":   vehicleCount,
		"geofences":  geofenceCount,
		"violations": violationCount,
		"alerts":     alertCount,
	})
}
