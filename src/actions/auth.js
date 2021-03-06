import { myFirebase } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS';
export const GET_ROLE_ERROR = 'GET_ROLE_ERROR';

export const ADD_BEER_REQUEST = 'ADD_BEER_REQUEST';
export const ADD_BEER_SUCCESS = 'ADD_BEER_SUCCESS';
export const ADD_BEER_ERROR = 'ADD_BEER_ERROR';

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_ERROR = 'GET_ALL_USERS_ERROR';

export const SET_USER_ACTIVE_REQUEST = 'SET_USER_ACTIVE_REQUEST';
export const SET_USER_ACTIVE_SUCCESS = 'SET_USER_ACTIVE_SUCCESS';
export const SET_USER_ACTIVE_ERROR = 'SET_USER_ACTIVE_ERROR';

export const GET_BEERS_LIST_REQUEST = 'GET_BEERS_LIST_REQUEST';
export const GET_BEERS_LIST_SUCCESS = 'GET_BEERS_LIST_SUCCESS';
export const GET_BEERS_LIST_ERROR = 'GET_BEERS_LIST_ERROR';

export const DELETE_BEER_REQUEST = 'DELETE_BEER_REQUEST';
export const DELETE_BEER_SUCCESS = 'DELETE_BEER_SUCCESS';
export const DELETE_BEER_ERROR = 'DELETE_BEER_ERROR';

export const UPDATE_BEER_REQUEST = 'UPDATE_BEER_REQUEST';
export const UPDATE_BEER_SUCCESS = 'UPDATE_BEER_SUCCESS';
export const UPDATE_BEER_ERROR = 'UPDATE_BEER_ERROR';


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

const receiveLogin = (user, userStatus) => {
    return {
        type: LOGIN_SUCCESS,
        user,
        userStatus
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

const getRoleSuccess = role => {
    return {
        type: GET_ROLE_SUCCESS,
        role
    }
}

const getRoleError = error => {
    return {
        type: GET_ROLE_ERROR,
        error
    }
}

const addBeerRequest = () => {
    return {
        type: ADD_BEER_REQUEST
    }
}
 
const addBeerSuccess = () => {
    return {
        type: ADD_BEER_SUCCESS
    }
}
 
const addBeerError = () => {
    return {
        type: ADD_BEER_ERROR
    }
}

const getAllUsersRequest = () => {
    return {
        type: GET_ALL_USERS_REQUEST
    }
}

const getAllUsersSuccess= users => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        users
    }
}

// const getAllUsersError = error => {
//     return {
//         type: GET_ALL_USERS_REQUEST,
//         error
//     }
// }

const setUserActiveRequest = () => {
    return {
        type: SET_USER_ACTIVE_REQUEST
    }
}

const getAllBeersRequest = () => {
    return {
        type: GET_BEERS_LIST_REQUEST
    }
}

const getAllBeersSuccess = beers => {
    return {
        type: GET_BEERS_LIST_SUCCESS,
        beers
    }
}

const deleteBeerRequest = () => {
    return {
        type: DELETE_BEER_REQUEST
    }
}

const deleteBeerSuccess = () => {
    return {
        type: DELETE_BEER_SUCCESS
    }
}

const deleteBeerError = () => {
    return {
        type: DELETE_BEER_ERROR
    }
}

const updateBeerRequest = () => {
    return {
        type: UPDATE_BEER_REQUEST
    }
}

const updateBeerSuccess = () => {
    return {
        type: UPDATE_BEER_SUCCESS
    }
}

const updateBeerError = () => {
    return {
        type: UPDATE_BEER_ERROR
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

// const transformRoleResponse = async(object) => {
//     const array = [];
//     const keys = Object.keys(object);
//     keys.forEach(key => {
//         const user = {id:key}
//         array.push(Object.assign(user,object[key]))
//     })
//     return array;
// }

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
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(user => {
            getUserStatus(user,dispatch);
        })
        .catch(error => {
            dispatch(loginError(error))}

        );
};

 
function getUserStatus(user,dispatch){
    myFirebase
    .database()
    .ref('users')
    .orderByChild('userId')
    .equalTo(user.user.uid)
    .once('value')
            .then( snapshot => { 
        //dispatch(receiveLogin(user, Object.values(snapshot.val())[0].status));
          checkIfUserActive(user, Object.values(snapshot.val())[0].status, dispatch)
            })
    .catch(error => 
        //console.log('There was an error while adding beer details ' + error)
        dispatch(loginError(error))
    )
};

function checkIfUserActive(user, status, dispatch){
    if (status === 'active') {
        dispatch(receiveLogin(user, status));
        toast.success("Successfully logged in!")
    }
    else{
        var error = {code: 212, message : 'This user is not active.'};
        dispatch(loginError(error));
    }
}

export const getRole = userId => dispatch => {
     myFirebase
            .database()
            .ref('users')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value')
            .then( snapshot => {
               dispatch(getRoleSuccess(Object.values(snapshot.val())[0].role))
            }
        )
            .catch(error => {
                dispatch(getRoleError());
                //console.log('There was an error while fetching role ' + error);
            })
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
            toast.success("Successfully logged out!")
        })
        .catch(error => {
            dispatch(logoutError());
            toast.error(error.message)
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
            addUserRole(user.user.uid,email,role,dispatch);
            }
        )
        .catch(error => {
            dispatch(addUserError(error));
            toast.error('There was an error while adding user ' + error.message);
        });
};

function addUserRole(userId, email, role,dispatch) {
    dispatch(requestAddUserRole());
    myFirebase
    .database()
    .ref('users')
    .push({'userId':userId, 'email': email, 'role': role, 'status': 'active'})
    .then( () => {
        dispatch(receiveAddUserRole());
        toast.success("Successfully added a new user!");
        //console.log('Successfully added role.')
    }
   )
    .catch(error => {
        dispatch(addUserRoleError());
        toast.error('There was an error while adding role ' + error.message);
        //console.log('There was an error while adding role ' + error);
    })

};

export const addBeer = (name, price, volume, file) => dispatch => {
    dispatch(addBeerRequest());
    // Create a root reference
    var storageRef = myFirebase.storage().ref();
 
    // Create a reference
    var imgRef = storageRef.child('beers/' + file.name);
    //myFirebase.storage().ref().put(file)
    imgRef.put(file)
    .then(snapshot => {
        //this.addBeerDetails(name, price, volume);
        storageRef.child('beers/' + file.name).getDownloadURL()
        .then(url => {
            //console.log(url);
            addBeerDetails(name, price, volume, url)
            dispatch(addBeerSuccess());
            
        })
        
    })
    .catch( e => {
        dispatch(addBeerError(e.message));
        toast.error('There was an error while adding beer ' + e.message);
        //console.log(e)
    });
 
 
}
 
function addBeerDetails(name, price, volume, url) {
    myFirebase
    .database()
    .ref('beers')
    .push({'name':name, 'price': price, 'volume':volume, 'downloadUrl':url})
    .then( () => 
        //console.log('Successfully added beer details.')
        toast.success("Successfully added new beer!")
   )
    .catch(error => 
        //console.log('There was an error while adding beer details ' + error)
        toast.error('There was an error while adding beer details ' + error.message)
    )
};

export const getAllUsers = () => dispatch => {
    let niz = [];
    dispatch(getAllUsersRequest());
    myFirebase
        .database()
        .ref('/users')
        .on('value',
        snapshot => {
            niz = transformDataResponse(snapshot.val())
            dispatch(getAllUsersSuccess(niz));
        });
}

export const setUserActive = user => dispatch => {
    var postData = {
        userId: user.userId,
        email: user.email,
        role: user.role,
        status: 'active'
      };

    var updates = {};
    updates['/users/' + user.id] = postData;
    
    dispatch(setUserActiveRequest());
    myFirebase
    .database()
    .ref()
    .update(updates)
    .then(()=> {
        toast.success("Successfully activated user " + user.email + '.');
        //console.log('uspesno izmenjen status');
    })
    .catch(error => {
        toast.error("There was an error while activating user." + error.message);
        //console.log(error.message);
    });
}

export const setUserInactive = user => dispatch => {
    var postData = {
        userId: user.userId,
        email: user.email,
        role: user.role,
        status: 'inactive'
      };

    var updates = {};
    updates['/users/' + user.id] = postData;
    
    dispatch(setUserActiveRequest());
    myFirebase
    .database()
    .ref()
    .update(updates)
    .then(()=> {
        toast.success("Successfully deactivated user " + user.email + '.');
        //console.log('uspesno deaktiviran status');
    })
    .catch(error => {
        toast.error("There was an error while deactivating user." + error.message);
        //console.log(error.message);
    });
}

export const getAllBeers = () => dispatch => {
    let niz = [];
    dispatch(getAllBeersRequest());
    myFirebase
     .database()
     .ref('/beers')
     .on('value', snapshot => {
      niz = transformDataResponse(snapshot.val())
      dispatch(getAllBeersSuccess(niz));
     })
}

export const deleteBeer = (beer) => dispatch => {
    dispatch(deleteBeerRequest());
    myFirebase
     .database()
     .ref('/beers/' + beer.id)
     .remove()
     .then(() =>
        dispatch(deleteBeerSuccess())
     )
     .catch((error) => {
         dispatch(deleteBeerError(error.message));
     }

     )
}

export const updateBeer = (beer) => dispatch => {
    dispatch(updateBeerRequest());
    console.log(beer);
    myFirebase
     .database()
     .ref('/beers/' + beer.id)
     .update({'name':beer.name, 'price': beer.price, 'volume':beer.volume, 'downloadUrl':beer.downloadUrl},  
      function(error) {
        if (error) {
             console.log('update failed');
             dispatch(updateBeerError());
        } else {
             console.log('update successful');
             dispatch(updateBeerSuccess());
        }
      })
}
