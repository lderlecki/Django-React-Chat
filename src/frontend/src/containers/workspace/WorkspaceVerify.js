import React, {useEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {load_rooms_in_workspace} from "../../actions/chat";
import {CircularProgress} from "@material-ui/core";



const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}


const WorkspaceVerify = ({load_rooms_in_workspace, match, chat, roomsLoaded}) => {

    useEffect( () => {
        if (!roomsLoaded) {
            load_rooms_in_workspace(match.params.workspace);
        }
    }, [chat.workspace])

    useConstructor(() => {
        load_rooms_in_workspace(match.params.workspace);
        console.log('in constructor after dispatch', roomsLoaded)
    })
    console.log('after constructor: ', roomsLoaded)

    if (!roomsLoaded) {
        console.log('if', )
        return <CircularProgress/>
    } else if (chat.currentRoom) {
        console.log('else if (', )
        return <Redirect to={`/${match.params.workspace}/${chat.currentRoom.code}`}/>
    } else {
        console.log('else', )
        return <Redirect to={`/${match.params.workspace}/create`}/>
    }
}

const mapStateToProps = state => ({
    chat: state.chat,
    roomsLoaded: state.chat.roomsLoaded
})

WorkspaceVerify.propTypes = {
    chat: PropTypes.array.isRequired,
    load_rooms_in_workspace: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {load_rooms_in_workspace})(WorkspaceVerify)
