import React, {Component, Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, makeStyles, CssBaseline, CircularProgress} from "@material-ui/core";
import {load_rooms_in_workspace} from "../../actions/chat";
import ChatSidebar from "./ChatSidebar";
import Chat from "./Chat";

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

    componentDidMount() {
        const {
            match,
            load_rooms_in_workspace,
            chat,
        } = this.props
        load_rooms_in_workspace(match.params.workspace)
    }

    render() {
        const {
            chat,
        } = this.props
        return (
            <Fragment >
                <div style={{display: 'flex', flexDirection:'row', height: '100%'}}>
                    <ChatSidebar workspace={chat.workspace} rooms={chat.rooms} currentRoom={chat.currentRoom} />
                    <Chat currentRoom={chat.currentRoom}/>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    chat: state.chat
})

export default connect(mapStateToProps, {load_rooms_in_workspace})(ChatPage);
