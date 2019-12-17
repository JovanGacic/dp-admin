import { myFirebase } from '../firebaseConfig';
import firebase from 'firebase';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const VERIFY_REQUEST = 'VERIFY_REQUEST';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const ADD_USER_ROLE_REQUEST = 'ADD_USER_ROLE_REQUEST';
export const ADD_USER_ROLE_SUCCESS = 'ADD_USER_ROLE_SUCCESS';
export const ADD_USER_ROLE_FAILURE = 'ADD_USER_ROLE_FAILURE';

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_ERROR = 'FETCH_ROLE_ERROR';


const requestGetData = () => {
    return {
        type: GET_DATA_REQUEST
    };
};

const receiveGetData = data => {
    return {
        type: GET_DATA_SUCCESS,
        data
    }
}

const getDataError = () => {
    return {
        type: GET_DATA_FAILURE
    }
}

const requestAddUserRole = () => {
    return {
        type: ADD_USER_ROLE_REQUEST
    };
};

const receiveAddUserRole = () => {
    return {
        type: ADD_USER_ROLE_SUCCESS
    };
};

const addUserRoleError = () => {
    return {
        type: ADD_USER_ROLE_FAILURE
    };
};

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = error => {
    return {
        type: LOGIN_FAILURE,
        error
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

const requestAddUser = () => {
    return {
        type: ADD_USER_REQUEST
    };
};

const receiveAddUser = () => {
    return {
        type: ADD_USER_SUCCESS,
    };
};

const addUserError = error => {
    return {
        type: ADD_USER_FAILURE,
        error
    };
};

const fetchRoleSuccess = role => {
    console.log(role);
    return {
        type: FETCH_ROLE_SUCCESS,
        role
    }
}

const fetchRoleError = () => {
    return {
        type: FETCH_ROLE_ERROR
    }
}

const transformDataResponse = object => {
    const array = [];
    const keys = Object.keys(object);
    keys.forEach(key => {
        const order = {id: key}
        array.push(Object.assign(order, object[key]))
    })
    return array;
};

const transformRoleResponse = async(object) => {
    const array = [];
    const keys = Object.keys(object);
    keys.forEach(key => {
        const user = {id:key}
        array.push(Object.assign(user,object[key]))
    })
    return array;
}

export const getData = () => dispatch => {
    let niz = [];
    dispatch(requestGetData());
    myFirebase
        .database()
        .ref('/data')
        .on('value',
        snapshot => {
            niz = transformDataResponse(snapshot.val())
            dispatch(receiveGetData(niz));
        });
        // .catch(error => {
        //     dispatch(getDataError());
        // })
};

export const loginUser = (email, password) => dispatch => {
    let role = '';
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(user => {
            dispatch(receiveLogin(user));
            getUserRole(user.user.uid);
        })
        .catch(error => {
          //  console.log(error.message);
            dispatch(loginError(error))}
        );
};

const getUserRole = userId => {
     myFirebase
            .database()
            .ref('users')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value')
            .then( snapshot => {
               console.log(transformRoleResponse(snapshot.val()));
            }
        )
            .catch(error => {
                console.log('There was an error while fetching role ' + error);
            })
};

export const logoutUser = () => dispatch => {
    
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch(error => {
            dispatch(logoutError());
        });
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch(receiveLogin(user));
            }
            dispatch(verifySuccess());
        });
};

export const addUser = (email, password, role) => dispatch => {
    dispatch(requestAddUser());
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( user => {
            dispatch(receiveAddUser());
            addUserRole(user.user.uid,role);
            }
        )
        .catch(error => {
            dispatch(addUserError(error));
        });
};

const addUserRole = (userId, role) => {
    myFirebase
    .database()
    .ref('users')
    .push({'userId':userId, 'role': role})
    .then( () => 
        console.log('Successfully added role.')
   )
    .catch(error => {
        console.log('There was an error while adding role ' + error);
    })
};

