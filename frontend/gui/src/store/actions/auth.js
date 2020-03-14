import * as actionTypes from './actionTypes';
import axios from 'axios';

// What to do based on the type of action 
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

// successful logins have an authentication token
export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// checks to see if the authentication token expired
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
        // convert it from miliseconds to seconds
    }
}

// Parameters to log in
export const authLogin = (username, password) => {
    // alert us that the auth start has taken place
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000', {
            username: username,
            password: password
        })
            // see what the response to this post request is
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                // need to store this data in a persistant storage
                // (not redux bc when refreshed, the data would be lost)
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
    }
}