package models

import "time"

type Geofence struct {
	ID          string    `gorm:"primaryKey" json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Category    string    `json:"category"`
	Coordinates string    `gorm:"type:text" json:"coordinates"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}
