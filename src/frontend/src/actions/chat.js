import axios from "axios";
import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOM_LOADED_SUCCESS,
    ROOM_LOADED_FAIL, ROOMS_LOADING,
} from './types'
import {getCookie} from "./utils";


export const load_workspaces = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        try {
            const response = await axios.get('/api/workspace/list/', config);
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

export const load_rooms_in_workspace = (code) => async dispatch => {
    dispatch({
        type: ROOMS_LOADING
    })
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    try{
        const response = await axios.get(`/api/workspace/${code}/`, config)
        dispatch({
            type: ROOM_LOADED_SUCCESS,
            payload: response.data
        })
    } catch (err){
        dispatch({
            type: ROOM_LOADED_FAIL
        })
    }
}

export const createWorkspace = (name, is_private, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    const body = JSON.stringify({name, is_private, password});
    try {
        const response = await axios.post('/api/workspace/create/', body, config)
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
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    const body = JSON.stringify({name, is_private, password});
    try {
        const response = await axios.post(`/api/workspace/${workspaceCode}/create/`, body, config)
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
