package routes

import (
	"geofencing-system/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

	router.POST("/geofences", handlers.CreateGeofence)

	router.GET("/geofences", handlers.GetGeofences)
}
