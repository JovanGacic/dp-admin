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
         GET_ROLE_SUCCESS,
         GET_ALL_USERS_REQUEST,
         GET_ALL_USERS_SUCCESS,
         SET_USER_ACTIVE_REQUEST,
         SET_USER_ACTIVE_SUCCESS,
         SET_USER_ACTIVE_ERROR,
         GET_BEERS_LIST_REQUEST,
         GET_BEERS_LIST_SUCCESS,
         GET_BEERS_LIST_ERROR
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
        isRegistering: false,
        data: [],
        role: '',
        userStatus: '',
        users: [],
        isChangingStatus: false,
        beers: []
   
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
                user: action.user,
                userStatus: action.userStatus
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
                ...state,
                isRegistering: true
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                registrationError: false,
                isRegistering: false
            }
        case ADD_USER_FAILURE:
            return {
                ...state,
                registrationError: true,
                registrationErrorMsg: action.error.message,
                isRegistering: false
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
        case GET_ALL_USERS_REQUEST:
            return {
                ...state
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            }
        case  SET_USER_ACTIVE_REQUEST:
            return {
                ...state,
                isChangingStatus: true
            }
        case SET_USER_ACTIVE_SUCCESS:
            return {
                ...state,
                isChangingStatus: false
            }
        case SET_USER_ACTIVE_ERROR:
            return {
                ...state,
                isChangingStatus: false
            }
        case GET_BEERS_LIST_REQUEST:
            return {
                ...state
            }
        case GET_BEERS_LIST_SUCCESS:
            return {
                ...state,
                beers: action.beers
            }
        case GET_BEERS_LIST_ERROR:
            return {
                ...state
            }
        default:
            return state;
    };
}