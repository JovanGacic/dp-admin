import { LOGIN_REQUEST,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT_REQUEST,
         LOGOUT_SUCCESS,
         LOGOUT_FAILURE,
         VERIFY_REQUEST,
         VERIFY_SUCCESS,
         ADD_USER_REQUEST,
         ADD_USER_SUCCESS,
         ADD_USER_FAILURE,
         GET_DATA_REQUEST,
         GET_DATA_SUCCESS,
         GET_ROLE_SUCCESS
        } from '../actions/';

export default (
    state = {
        isLoggingIn: false,
        isLoggingOut: false,
        isVerifying: false,
        verifyingError: false,
        loginError: false,
        loginErrorMessage: '',
        logoutError: false,
        isAuthenticated: false,
        user: {},
        registrationError: false,
        registrationErrorMsg: '',
        data: [],
        role: ''
    },
    action
     ) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
                loginErrorMessage: action.error.message
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {},
                data: []
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            }
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
            }
        case ADD_USER_REQUEST:
            return {
                ...state
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                registrationError: false,
            }
        case ADD_USER_FAILURE:
            return {
                ...state,
                registrationError: true,
                registrationErrorMsg: action.error.message
            }
        case GET_DATA_REQUEST:
            return {
                ...state
            }
        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case GET_ROLE_SUCCESS:
            return {
                ...state,
                role: action.role
            }
        default:
            return state;
    };
}