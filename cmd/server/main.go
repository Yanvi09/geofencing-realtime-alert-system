package main

import (
	"geofencing-system/internal/config"
	"geofencing-system/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.ConnectDB()

	router := gin.Default()

	// Enable CORS for React frontend
	router.Use(cors.Default())

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Geofencing API Running",
		})
	})

	// Register all routes
	routes.RegisterRoutes(router)

	router.Run(":8080")
}
