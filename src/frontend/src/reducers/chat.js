import {
    WORKSPACE_CREATE_SUCCESS,
    WORKSPACES_FETCHED_FAIL,
    WORKSPACES_FETCHED_SUCCESS,
    WORKSPACE_CREATE_FAIL,
} from "../actions/types";

const initialState = {
    workspaces: null,
    workspace: null,
    room: null,
    isOwner: null,

}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type){
        case WORKSPACES_FETCHED_SUCCESS:
            return {
                ...state,
                workspaces: payload,

            }

        case WORKSPACES_FETCHED_FAIL:
            return {
                ...state,
                workspace: null,
                workspaces: null,
                room: null,
                isOwner: null,

            }

        case WORKSPACE_CREATE_SUCCESS:
            return {
                ...state,
                workspace: payload.workspace,
                workspaces: [...state.workspaces, payload],
                room: payload.room,
                isOwner: payload.is_owner,
            }

        case WORKSPACE_CREATE_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }

}
