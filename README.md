# Geofencing Real-Time Alert System

## Overview

Geofencing Real-Time Alert System is a full-stack application designed to monitor vehicle movement relative to predefined geofenced zones. The system detects entry and exit events, generates real-time alerts, maintains violation history, and provides operational visibility through a centralized dashboard.

The project was developed as a technical assessment focusing on geospatial event detection, real-time communication, backend API development, and frontend integration.

---

## Features

### Vehicle Management

* Register vehicles
* View all registered vehicles
* Maintain vehicle metadata

### Geofence Management

* Create geofenced zones
* Categorize zones (Restricted Area, Delivery Zone, Toll Zone, Customer Area)
* Store polygon coordinates for geofence boundaries

### Real-Time Tracking

* Simulate vehicle movement
* Update vehicle locations
* Detect vehicle presence inside or outside geofence boundaries

### Event Detection

* Entry detection
* Exit detection
* Geofence state persistence
* Duplicate event prevention

### Alert Management

* Configure alert rules
* Vehicle-specific alerts
* Geofence-specific alerts
* Entry, Exit, and Both event support

### Real-Time Notifications

* WebSocket-based alert delivery
* Live alert feed
* Instant notification when a rule is triggered

### Violation History

* Store geofence events
* Track vehicle activity
* Maintain audit history for entry and exit events

### Dashboard Statistics

* Vehicle count
* Geofence count
* Alert count
* Violation count

### Containerization

* Dockerized backend service
* Docker Hub image available for deployment

---

## Technology Stack

### Backend

* Go
* Gin Framework
* PostgreSQL
* GORM
* Gorilla WebSocket

### Frontend

* React
* Axios
* Vite

### DevOps

* Docker
* Docker Hub

---

## Project Structure

backend/

* cmd/server
* internal/config
* internal/handlers
* internal/models
* internal/routes
* internal/utils
* internal/websocket

frontend/

* src/components
* src/pages
* src/api

---

## API Endpoints

### Vehicles

POST /vehicles

GET /vehicles

POST /vehicles/location

GET /vehicles/location/:vehicle_id

### Geofences

POST /geofences

GET /geofences

### Alerts

POST /alerts/configure

GET /alerts

### Violations

GET /violations/history

### Dashboard

GET /dashboard/stats

### WebSocket

GET /ws/alerts

---

## Docker

Docker Hub Image:

https://hub.docker.com/r/anviyadav45/geofencing-system

Build Image:

docker build -t geofencing-system .

Run Container:

docker run -p 8080:8080 geofencing-system

---

## Workflow

1. Create a vehicle
2. Create a geofence
3. Configure an alert rule
4. Update vehicle location
5. Detect entry or exit event
6. Trigger alert rule
7. Broadcast WebSocket notification
8. Store violation record
9. Display results in frontend dashboard

---


