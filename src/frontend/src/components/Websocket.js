import {SOCKET_URL} from "../settings";

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
        const path = `${SOCKET_URL}/ws/workspace/${workspaceCode}/${roomCode}/?token=${localStorage.getItem('access')}`;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log("WebSocket open");
            // dispatch connecting to websocket
        };
        this.socketRef.onmessage = e => {
            console.log('message received')
            this.socketNewMessage(e.data);
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
            // dispatch websocket error
        };
        this.socketRef.onclose = () => {
            // dispatch websocket closed
            console.log("WebSocket closed let's reopen");
            // this.connect();
        };
    }

    disconnect() {
        this.socketRef.close();
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (command === "messages") {
            this.callbacks[command](parsedData.messages);
        } else if (command === "new_message") {
            this.callbacks[command](parsedData.message);
        }
    }

    newChatMessage(message) {
        this.sendMessage({
            command: "new_message",
            author: message.author,
            message: message.content,
            room_code: message.room_code,
        });
    }

    sendMessage(data) {
        // dispatch message sending
        try {
            this.socketRef.send(JSON.stringify({...data}));
            // dispatch message sent success
        } catch (err) {
            console.log(err.message);
            console.log('msg not sent')
            // dispatch message sent failed
        }
    }

    state() {
        return this.socketRef.readyState;
    }

    addCallbacks(newMessageCallback) {
        this.callbacks["new_message"] = newMessageCallback;
    }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
