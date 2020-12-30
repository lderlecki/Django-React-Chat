import React, {Component, Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, makeStyles, CssBaseline, CircularProgress} from "@material-ui/core";
import {
    addMessage,
    checkUserHasRoomAccess,
    enterRoomWithPassword,
    fetchRoom,
    load_rooms_in_workspace
} from "../../actions/chat";
import ChatSidebar from "./ChatSidebar";
import Chat from "./Chat";
import WebSocketInstance from "../../components/Websocket";


class ChatPage extends Component {

    initChat() {
        const {
            match,
            addMessage
        } = this.props
        const params = match.params
        WebSocketInstance.addCallbacks(addMessage)
        this.waitForSocketConnection();
        WebSocketInstance.connect(params.workspace, params.room)
    }

    constructor(props) {
        super(props);
        this.initChat();
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                // Check if websocket is OPEN
                if (WebSocketInstance.state() === 1) {
                    console.log("Connected")
                    if (callback)
                        callback();
                    return;
                } else {
                    console.log("Connecting")
                    component.waitForSocketConnection(callback);
                }
            }, 100); // wait 100 milliseconds for the connection...
    }

    componentDidMount() {
        // Todo: take verifying logic from sidebar and put it here. On will receive params do the verify logic
        //  then if user has no permission to enter the room ask for password.
        const {
            match,
            chat,
            load_rooms_in_workspace,
            fetchRoom,
        } = this.props
        const params = match.params
        if (!chat.roomsLoaded) {
            load_rooms_in_workspace(params.workspace).then(() => {
                fetchRoom(params.workspace, params.room)
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // Old params
        const {match: {params}, fetchRoom} = this.props
        // New params
        const {params: nextParams} = nextProps.match;

        if (nextParams.room && params.room !== nextParams.room) {
            fetchRoom(nextParams.workspace, nextParams.room)
            WebSocketInstance.disconnect();
            this.waitForSocketConnection()
            WebSocketInstance.connect(nextParams.workspace, nextParams.room)
        }
    }

    render() {
        const {
            user,
            chat,
            fetchRoom,
            checkUserHasRoomAccess,
            enterRoomWithPassword
        } = this.props

        if (chat.roomsLoaded && chat.roomFetched) {
            return (
                <Fragment>
                    <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
                        <ChatSidebar
                            chat={chat}
                            workspace={chat.workspace}
                            rooms={chat.rooms}
                            currentRoom={chat.currentRoom}
                            fetchRoom={fetchRoom}
                            verifyAccess={checkUserHasRoomAccess}
                            enterRoomWithPassword={enterRoomWithPassword}
                        />
                        <Chat user={user} currentRoom={chat.currentRoom}/>
                    </div>
                </Fragment>
            )
        } else {
            return <CircularProgress/>
        }

    }

}

const mapStateToProps = state => ({
        user: state.auth.user,
        chat: state.chat
    })

const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addMessage(message)),
        load_rooms_in_workspace: workspaceCode => dispatch(load_rooms_in_workspace(workspaceCode)),
        checkUserHasRoomAccess: roomCode => dispatch(checkUserHasRoomAccess(roomCode)),
        enterRoomWithPassword: (roomCode, password) => dispatch(enterRoomWithPassword(roomCode, password)),
        fetchRoom: (workspaceCode, roomCode) => dispatch(fetchRoom(workspaceCode, roomCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
