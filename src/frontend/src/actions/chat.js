import axios from "axios";
import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOM_LOADED_SUCCESS,
    ROOM_LOADED_FAIL,
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

export const createWorkspace = (name, is_private, password) => async dispatch => {
    // const csrftoken = getCookie('csrftoken')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            // 'X-CSRFToken': csrftoken
        }
    }
    const body = JSON.stringify({name, is_private, password});
    try {
        const response = await axios.post('/api/workspace/create/', body, config)
        console.log(response.data)
        dispatch({
            type: WORKSPACE_CREATE_SUCCESS,
            payload: response.data
        })
        // dispatch(load_workspaces())
    } catch (err) {
        dispatch({
            type: WORKSPACE_CREATE_FAIL,
        })
    }
}
