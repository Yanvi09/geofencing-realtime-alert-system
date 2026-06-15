package models

import "time"

type Geofence struct {
	ID          string `gorm:"primaryKey"`
	Name        string
	Description string
	Category    string
	Coordinates string `gorm:"type:text"`
	Status      string
	CreatedAt   time.Time
}
