import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_IS_LOADING,
} from './types';

// export const checkAuthenticated = () => async dispatch => {
//     if (localStorage.getItem('access')) {
//         dispatch({
//             type: USER_IS_LOADING
//         })
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             }
//         };
//
//         const body = JSON.stringify({token: localStorage.getItem('access')});
//         try {
//             const response = await axios.post('/auth/jwt/verify/', body, config)
//             if (response.status !== 401) {
//                 dispatch({
//                     type: AUTHENTICATED_SUCCESS,
//                 })
//             } else {
//                 dispatch({
//                     type: AUTHENTICATED_FAIL
//                 })
//             }
//
//         } catch (err) {
//             dispatch({
//                 type: AUTHENTICATED_FAIL
//             })
//         }
//
//     } else {
//         dispatch({
//             type: AUTHENTICATED_FAIL
//         })
//     }
// }

export const load_user = () => async dispatch => {
    dispatch({
        type: USER_IS_LOADING
    })
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        try {
            const response = await axios.get('/auth/users/me/', config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};
// export const login = (email, password) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     const body = JSON.stringify({email, password});
//     try {
//         const response = await axios.post('/auth/jwt/create/', body, config);
//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: response.data
//         });
//         dispatch(load_user())
//
//     } catch (err) {
//         dispatch({
//             type: LOGIN_FAIL,
//             payload: err
//         })
//     }
// };

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});
    await axios.post('/auth/jwt/create/', body, config)
        .then((response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            dispatch(load_user())
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.detail
            })
        })
}

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({name, email, password, re_password});

    try {
        const response = await axios.post('/auth/users/', body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        });

    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({uid, token});

    try {
        const response = await axios.post('/auth/users/activation/', body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: response.data,
        });

    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({email});

    try {
        const response = await axios.post('/auth/users/reset_password/', body, config)
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: response.data
        })

    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }

}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        await axios.post('/auth/users/reset_password_confirm/', body, config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })

    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }

}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT,
    });
}
