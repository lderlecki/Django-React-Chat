import React, {Component, Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, makeStyles, CssBaseline, CircularProgress} from "@material-ui/core";
import {addMessage, fetchRoom, load_rooms_in_workspace} from "../../actions/chat";
import ChatSidebar from "./ChatSidebar";
import Chat from "./Chat";
import WebSocketInstance from "../../components/Websocket";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: '100%',
        maxWidth: '500px',
    },
    list: {
        margin: '55px 0',
        width: '100%',
        borderRadius: '5px',
        boxShadow: '0px 0px 15px 0px rgba(163, 163, 163, .5)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '0 25px',
        justifyContent: 'left',

        borderBottom: 'solid 1px #4a5fc1',
    },
    item: {
        display: "flex",
        flexDirection: "column",

    },
    itemLink: {},
    itemBlock: {
        transition: "all .75s ease",
        display: "block",
        '&:hover': {
            backgroundColor: '#b7c3e1',
        }

    },
    createWorkspace: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: '5px',
        padding: '16px 25px',
        justifyContent: "space-between",
        backgroundColor: '#b7c3e1',
    }
})

class ChatPage extends Component {

    initChat() {
        const {
            match,
            addMessage
        } = this.props
        const params = match.params
        WebSocketInstance.addCallbacks(addMessage.bind(this))
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
        } = this.props
        if (chat.roomsLoaded && chat.roomFetched) {
            return (
                <Fragment>
                    <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
                        <ChatSidebar
                            workspace={chat.workspace}
                            rooms={chat.rooms}
                            currentRoom={chat.currentRoom}
                            fetchRoom={fetchRoom}
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
        fetchRoom: (workspaceCode, roomCode) => dispatch(fetchRoom(workspaceCode, roomCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
