import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    ROOMS_LOADING,
    ROOMS_LOADED_SUCCESS,
    ROOMS_LOADED_FAIL, LOGOUT, ROOM_CREATE_SUCCESS, ROOM_CREATE_FAIL,
    CHANGING_ROOM,
    FETCH_ROOM_REQUEST, ROOM_FETCH_SUCCESS, ROOM_FETCH_FAILED,
} from "../actions/types";

const initialState = {
    workspacesLoaded: false,
    workspace: null,
    workspaces: [],
    // users: null,  // don't need workspace members for now

    roomsLoaded: false,
    roomFetched: false,
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
                currentRoom: null,
                workspaces: payload,
                roomsLoaded: false,
                roomFetched: false,
                workspacesLoaded: true

            }

        case WORKSPACES_FETCHED_FAIL:
            return {
                ...state,
                workspace: null,
                currentRoom: null,
                roomsLoaded: false,
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
                rooms: [],
                roomsLoaded: false
            }

        case FETCH_ROOM_REQUEST:
            return {
                ...state,
                roomFetched: false,
            }

        case ROOMS_LOADED_SUCCESS:
            return {
                ...state,
                workspace: payload.code,
                roomsLoaded: true,
                // currentRoom: payload.current_room,
                rooms: payload.rooms,

            }

        case ROOMS_LOADED_FAIL:
            return {
                ...state,
                roomsLoaded: true,
                currentRoom: null,
                rooms: null,

            }

        case ROOM_FETCH_SUCCESS:
            return {
                ...state,
                roomFetched: true,
                currentRoom: payload,
            }

        case ROOM_FETCH_FAILED:
            return {
                ...state,
                roomFetched: true,
                currentRoom: null,
            }

        case LOGOUT:
            return {
                ...initialState
            }

        default:
            return state
    }

}
