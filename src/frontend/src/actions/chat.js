import axios from "axios";
import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOMS_LOADED_SUCCESS,
    ROOMS_LOADED_FAIL, ROOMS_LOADING,
    CHANGING_ROOM,
    FETCH_ROOM_REQUEST,
    ROOM_FETCH_FAILED,
    ROOM_FETCH_SUCCESS,
    MESSAGE_RECEIVED,
    ROOM_ACCESS_GRANTED,
    ROOM_ACCESS_DENIED,
    ROOM_CHANGE_REQUEST,
    ROOM_CHECK_PASSWORD,
    ROOM_PASSWORD_CORRECT,
    ROOM_PASSWORD_INCORRECT,
} from './types'
import {getCookie} from "./utils";

const authConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
    }
};


export const load_workspaces = () => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            const response = await axios.get('/api/workspace/list/', authConfig);
            dispatch({
                type: WORKSPACES_FETCHED_SUCCESS,
                payload: response.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: WORKSPACES_FETCHED_FAIL
            })
        }
    } else {
        dispatch({
            type: WORKSPACES_FETCHED_FAIL
        })
    }
};

export const load_rooms_in_workspace = (workspaceCode) => async dispatch => {
    dispatch({
        type: ROOMS_LOADING
    })

    try {
        const response = await axios.get(`/api/workspace/${workspaceCode}/`, authConfig)
        console.log('load rooms in workspace: ', response)
        dispatch({
            type: ROOMS_LOADED_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: ROOMS_LOADED_FAIL
        })
    }
}

export const fetchRoom = (workspaceCode, roomCode) => async dispatch => {
    dispatch({
        type: FETCH_ROOM_REQUEST
    })
    if (roomCode) {
        try {
            const res = await axios.get(`/api/workspace/${workspaceCode}/${roomCode}/`, authConfig)
            dispatch({
                type: ROOM_FETCH_SUCCESS,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: ROOM_FETCH_FAILED
            })
        }
    } else {
        dispatch({
            type: ROOM_FETCH_FAILED
        })
    }
}

export const checkUserHasRoomAccess = (room_code) => async dispatch => {
    dispatch({
        type: ROOM_CHANGE_REQUEST
    })
    try {
        const response = await axios.get(`/api/workspace/room/${room_code}/verify/`, authConfig)
        dispatch({
            type: ROOM_ACCESS_GRANTED
        })
    } catch (err) {
        console.log('User does not have access to this room, must provide a password')
        dispatch({
            type: ROOM_ACCESS_DENIED
        })
    }
}

export const enterRoomWithPassword = (room_code, password) => async dispatch => {
    dispatch({
        type: ROOM_CHECK_PASSWORD
    })
    const body = JSON.stringify({password})
    try {
        await axios.post(`/api/workspace/room/${room_code}/verify/`, body, authConfig)
        dispatch({
            type: ROOM_PASSWORD_CORRECT
        })
        dispatch(checkUserHasRoomAccess(room_code))
    } catch (err) {
        dispatch({
            type: ROOM_PASSWORD_INCORRECT
        })
    }
}

export const createWorkspace = (name, is_private, password) => async dispatch => {
    const body = JSON.stringify({name, is_private, password});
    try {
        const response = await axios.post('/api/workspace/create/', body, authConfig)
        dispatch({
            type: WORKSPACE_CREATE_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: WORKSPACE_CREATE_FAIL,
        })
    }
}

export const createRoom = (name, is_private, password, workspaceCode) => async dispatch => {
    const body = JSON.stringify({name, is_private, password});
    try {
        const response = await axios.post(`/api/workspace/${workspaceCode}/create/`, body, authConfig)
        dispatch({
            type: ROOM_CREATE_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: ROOM_CREATE_FAIL,
        })
    }
}

// Message actions

export const addMessage = (message) => async dispatch => {
    dispatch({
        type: MESSAGE_RECEIVED,
        payload: message
    })
}

