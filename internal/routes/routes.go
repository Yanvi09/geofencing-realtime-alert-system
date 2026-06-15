package routes

import (
	"geofencing-system/internal/handlers"
	"geofencing-system/internal/websocket"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

	router.POST("/geofences", handlers.CreateGeofence)
	router.GET("/geofences", handlers.GetGeofences)

	router.POST("/vehicles", handlers.CreateVehicle)
	router.GET("/vehicles", handlers.GetVehicles)

	router.POST("/vehicles/location", handlers.UpdateVehicleLocation)

	router.GET(
		"/vehicles/location/:vehicle_id",
		handlers.GetVehicleLocation,
	)

	router.POST("/alerts/configure", handlers.CreateAlert)

	router.GET("/alerts", handlers.GetAlerts)

	router.GET("/violations/history", handlers.GetViolations)

	router.GET("/ws/alerts", websocket.HandleConnections)

	router.GET("/dashboard/stats", handlers.GetDashboardStats)
}
