package main

import (
	"geofencing-system/internal/config"
	"geofencing-system/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	config.ConnectDB()

	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Geofencing API Running",
		})
	})

	// Register all routes BEFORE Run()
	routes.RegisterRoutes(router)

	router.Run(":8080")
}
