import React, {useEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchRoom, load_rooms_in_workspace} from "../../actions/chat";
import {CircularProgress} from "@material-ui/core";


const useConstructor = (callBack = () => {
}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
}


const WorkspaceVerify = ({load_rooms_in_workspace, match, chat, fetchRoom}) => {

    useEffect(() => {
        if (chat.roomsLoaded) {
            if (chat.rooms.length > 0) {
                fetchRoom(match.params.workspace, chat.rooms[0].code)
            } else {
                fetchRoom(match.params.workspace, null)
            }
        }
    }, [chat.workspace])

    useConstructor(() => {
        if (!chat.roomsLoaded) {
            load_rooms_in_workspace(match.params.workspace);
        }
    })

    if (!chat.roomsLoaded || !chat.roomFetched) {
        return <CircularProgress/>
    } else if (chat.currentRoom) {
        return <Redirect to={`/${match.params.workspace}/${chat.currentRoom.code}`}/>
    } else {
        return <Redirect to={`/${match.params.workspace}/create`}/>
    }
}

const mapStateToProps = state => ({
    chat: state.chat,
})

WorkspaceVerify.propTypes = {
    chat: PropTypes.array.isRequired,
    load_rooms_in_workspace: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {load_rooms_in_workspace, fetchRoom})(WorkspaceVerify)
