import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACE_CREATE_FAIL,
    ROOMS_LOADING,
    ROOMS_LOADED_SUCCESS,
    ROOMS_LOADED_FAIL,
    LOGOUT,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    CHANGING_ROOM,
    FETCH_ROOM_REQUEST,
    ROOM_FETCH_SUCCESS,
    ROOM_FETCH_FAILED,
    MESSAGE_RECEIVED,
    ROOM_CHANGE_REQUEST,
    ROOM_ACCESS_GRANTED, ROOM_ACCESS_DENIED, ROOM_PASSWORD_INCORRECT, ROOM_CHECK_PASSWORD, ROOM_PASSWORD_CORRECT,
} from "../actions/types";

const initialState = {
    workspacesLoaded: false,
    workspace: null,
    workspaces: [],
    isWorkspaceOwner: null,
    // users: null,  // don't need workspace members for now

    roomsLoaded: false,
    roomFetched: false,
    changingRoom: false,

    currentRoom: null,
    hasRoomAccess: false,
    rooms: [], // rooms available in current workspace, that user has access to
    roomPasswordCorrect: false,

    socket: {
        isFetching: false
    },
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
                rooms: [...state.rooms, payload],
                currentRoom: payload,
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
                workspace: payload,
                roomsLoaded: true,
                hasRoomAccess: true,
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

        case ROOM_CHECK_PASSWORD:
        case ROOM_CHANGE_REQUEST:
            return {
                ...state,
                hasRoomAccess: true,
                changingRoom: true
            }

        case ROOM_ACCESS_GRANTED:
            return {
                ...state,
                hasRoomAccess: true,
                changingRoom: false
            }

        case ROOM_PASSWORD_CORRECT:
            return {
                ...state,
                changingRoom: true,
                hasRoomAccess: false,
                roomPasswordCorrect: true
            }

        case ROOM_ACCESS_DENIED:
        case ROOM_PASSWORD_INCORRECT:
            return {
                ...state,
                hasRoomAccess: false,
                changingRoom: false,
                roomPasswordCorrect: false
            }

        case LOGOUT:
            return {
                ...initialState
            }

        case MESSAGE_RECEIVED:
            return {
                ...state,
                currentRoom: {
                    messages: [...state.currentRoom.messages, payload]
                },
            }

        default:
            return state
    }

}
