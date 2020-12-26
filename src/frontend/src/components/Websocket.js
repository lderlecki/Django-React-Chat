import {SOCKET_URL} from "./settings";

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(workspaceCode, roomCode) {
        // dispatch connecting to websocket
        const path = `${SOCKET_URL}/ws/workspace/${workspaceCode}/${roomCode}/`;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log("WebSocket open");
            // dispatch connecting to websocket
        };
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
            // dispatch websocket error
        };
        this.socketRef.onclose = () => {
            // dispatch websocket closed
            console.log("WebSocket closed let's reopen");
            this.connect();
        };
    }

    disconnect() {
        this.socketRef.close();
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "messages") {
            this.callbacks[command](parsedData.messages);
        }
        if (command === "new_message") {
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages(username, room_code) {
        this.sendMessage({
            command: "fetch_messages",
            username: username,
            room_code: room_code
        });
    }

    newChatMessage(message) {
        this.sendMessage({
            command: "new_message",
            from: message.from,
            message: message.content,
            room_code: message.room_code
        });
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks["messages"] = messagesCallback;
        this.callbacks["new_message"] = newMessageCallback;
    }

    sendMessage(data) {
        // dispatch message sending
        try {
            this.socketRef.send(JSON.stringify({...data}));
            // dispatch message sent success
        } catch (err) {
            console.log(err.message);
            // dispatch message sent failed
        }
    }

    state() {
        return this.socketRef.readyState;
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
