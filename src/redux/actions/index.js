import { auth, provider } from '../../firebase';

export const SET_USER = 'SET_USER';
// login 4 : implémentation setPalad which goes into the reducer
export const setUser = (payload) => {
    return {
        type: 'SET_USER',
        user: payload
    }
}
// we create a function signInAPI in the action creator which dispatch the native function of firebase 
// when firebase response, we pass the payload
// Login 4 . signInAPI is create and will do something... call the Api and return a payload, if success we dispatch another function ' setUser' with the payload
export function signInAPI() {
    return (dispatch) => {
        auth.signInWithPopup(provider).then((payload)=> {
            console.log(payload)
            dispatch(setUser(payload.user))
            // we'll dispatch the user we have
        }).catch ((error) => alert(error.message))
    }
}

export function getUserAuth () {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    }
}