import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_IS_LOADING,
    USER_LOADING_FINISHED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED,
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case USER_IS_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case REFRESH_TOKEN_SUCCESS:
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }

        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
            }

        case USER_LOADING_FINISHED:
            return {
                ...state,
                isLoading: false,
            }

        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
        case REFRESH_TOKEN_FAILED:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                errorMsg: payload,
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
