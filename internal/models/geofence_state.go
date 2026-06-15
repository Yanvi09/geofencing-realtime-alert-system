package models

import "time"

type GeofenceState struct {
	ID         string    `gorm:"primaryKey"`
	VehicleID  string    `gorm:"index"`
	GeofenceID string    `gorm:"index"`
	IsInside   bool      `json:"is_inside"`
	UpdatedAt  time.Time `json:"updated_at"`
}
