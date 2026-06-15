package utils

import (
	"time"

	"github.com/gin-gonic/gin"
)

func SuccessResponse(c *gin.Context, start time.Time, data gin.H) {

	data["time_ns"] = time.Since(start).Nanoseconds()

	c.JSON(200, data)
}
