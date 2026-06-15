package main

import (
	"geofencing-system/internal/config"
	"geofencing-system/internal/routes"
	"os"

	"os"

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

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	router.Run(":" + port)
}
