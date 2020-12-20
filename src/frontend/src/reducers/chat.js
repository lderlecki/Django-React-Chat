import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    ROOMS_LOADING,
    ROOM_LOADED_SUCCESS,
    ROOM_LOADED_FAIL, LOGOUT, ROOM_CREATE_SUCCESS, ROOM_CREATE_FAIL,
} from "../actions/types";

const initialState = {
    workspacesLoaded: false,
    workspace: null,
    workspaces: [],
    // users: null,  // don't need workspace members for now

    roomsLoaded: false,
    currentRoom: null,
    rooms: [], // rooms available in current workspace, that user has access to

    isWorkspaceOwner: null,
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case WORKSPACES_FETCHED_SUCCESS:
            return {
                ...state,
                workspaces: payload,
                workspacesLoaded: true

            }

        case WORKSPACES_FETCHED_FAIL:
            return {
                ...state,
                workspace: null,
                workspaces: [],
                isWorkspaceOwner: null,
            }

        case WORKSPACE_CREATE_SUCCESS:
            return {
                ...state,
                workspace: payload.workspace,
                workspaces: [...state.workspaces, payload],
                room: null,
                isWorkspaceOwner: payload.is_owner,
            }

        case WORKSPACE_CREATE_FAIL:
            return {
                ...state,
            }

        case ROOM_CREATE_SUCCESS:
            return {
                ...state,
                workspace: payload.workspace,
                workspaces: [...state.workspaces, payload],
                room: null,
                isWorkspaceOwner: payload.is_owner,
            }

        case ROOM_CREATE_FAIL:
            return {
                ...state,
            }

        case ROOMS_LOADING:
            return {
                ...state,
                workspace: null,
                currentRoom: null,
                rooms: [],
                roomsLoaded: false
            }

        case ROOM_LOADED_SUCCESS:
            console.log('room loaded success')
            return {
                ...state,
                workspace: payload.code,
                roomsLoaded: true,
                currentRoom: payload.current_room,
                rooms: payload.rooms,

            }

        case ROOM_LOADED_FAIL:
            return {
                ...state,
                roomsLoaded: true,
                currentRoom: null,
                rooms: null,

            }

        case LOGOUT:
            return {
                ...initialState
            }

        default:
            return state
    }

}
