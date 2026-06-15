package handlers

import (
	"time"

	"geofencing-system/internal/config"
	"geofencing-system/internal/models"
	"geofencing-system/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateVehicleRequest struct {
	VehicleNumber string `json:"vehicle_number"`
	DriverName    string `json:"driver_name"`
	VehicleType   string `json:"vehicle_type"`
	Phone         string `json:"phone"`
}

func CreateVehicle(c *gin.Context) {

	start := time.Now()

	var req CreateVehicleRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(400, gin.H{
			"error": err.Error(),
		})

		return
	}

	// Assessment Validation
	if req.VehicleNumber == "" {
		c.JSON(400, gin.H{
			"error": "vehicle_number is required",
		})
		return
	}

	if req.DriverName == "" {
		c.JSON(400, gin.H{
			"error": "driver_name is required",
		})
		return
	}

	if req.VehicleType == "" {
		c.JSON(400, gin.H{
			"error": "vehicle_type is required",
		})
		return
	}

	if req.Phone == "" {
		c.JSON(400, gin.H{
			"error": "phone is required",
		})
		return
	}

	vehicle := models.Vehicle{
		ID:            uuid.New().String(),
		VehicleNumber: req.VehicleNumber,
		DriverName:    req.DriverName,
		VehicleType:   req.VehicleType,
		Phone:         req.Phone,
		Status:        "active",
	}

	if err := config.DB.Create(&vehicle).Error; err != nil {

		c.JSON(500, gin.H{
			"error": err.Error(),
		})

		return
	}

	utils.SuccessResponse(c, start, gin.H{
		"id":             vehicle.ID,
		"vehicle_number": vehicle.VehicleNumber,
		"status":         vehicle.Status,
	})
}

func GetVehicles(c *gin.Context) {

	start := time.Now()

	var vehicles []models.Vehicle

	config.DB.Order("created_at desc").Find(&vehicles)

	utils.SuccessResponse(c, start, gin.H{
		"vehicles": vehicles,
	})
}
