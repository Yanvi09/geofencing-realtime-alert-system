package models

import "time"

type Alert struct {
	ID         string    `gorm:"primaryKey" json:"alert_id"`
	GeofenceID string    `json:"geofence_id"`
	VehicleID  string    `json:"vehicle_id"`
	EventType  string    `json:"event_type"`
	Status     string    `json:"status"`
	CreatedAt  time.Time `json:"created_at"`
}
