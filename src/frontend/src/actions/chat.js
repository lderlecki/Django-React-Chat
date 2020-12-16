import axios from "axios";
import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    WORKSPACE_LOADED_SUCCESS,
    WORKSPACE_LOADED_FAIL,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOM_LOADED_SUCCESS,
    ROOM_LOADED_FAIL,
} from './types'


export const createWorkspace = (name, password, ) => async dispatch => {
    const config = {
        headers: {

        }
    }
}
