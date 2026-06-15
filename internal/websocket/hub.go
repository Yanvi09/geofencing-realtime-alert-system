package websocket

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var Clients = make(map[*websocket.Conn]bool)

var Upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func HandleConnections(c *gin.Context) {

	ws, err := Upgrader.Upgrade(
		c.Writer,
		c.Request,
		nil,
	)

	if err != nil {
		return
	}

	Clients[ws] = true

	for {
		_, _, err := ws.ReadMessage()

		if err != nil {
			delete(Clients, ws)
			ws.Close()
			break
		}
	}
}

func Broadcast(message interface{}) {

	for client := range Clients {

		err := client.WriteJSON(message)

		if err != nil {
			client.Close()
			delete(Clients, client)
		}
	}
}
