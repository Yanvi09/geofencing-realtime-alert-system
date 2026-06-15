package main

import (
	"geofencing-system/internal/config"

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

	router.Run(":8080")
}
