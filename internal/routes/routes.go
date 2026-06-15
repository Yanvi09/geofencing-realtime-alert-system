package routes

import (
	"geofencing-system/internal/handlers"

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
}
