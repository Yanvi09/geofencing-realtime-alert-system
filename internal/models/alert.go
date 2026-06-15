package models

import "time"

type Alert struct {
	ID            string    `gorm:"primaryKey" json:"alert_id"`
	GeofenceID    string    `json:"geofence_id"`
	VehicleID     string    `json:"vehicle_id"`
	EventType     string    `json:"event_type"`
	Status        string    `json:"status"`
	VehicleNumber string    `json:"vehicle_number"`
	GeofenceName  string    `json:"geofence_name"`
	TriggeredAt   time.Time `json:"triggered_at"`
	CreatedAt     time.Time `json:"created_at"`
}
