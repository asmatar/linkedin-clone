import db, { auth, provider, storage } from '../../firebase';
export const SET_USER = 'SET_USER';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const GET_ARTICLES = 'GET_ARTICLES';


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
// login 4 : implémentation setPalad which goes into the reducer
export const setUser = (payload) => {
    return {
        type: 'SET_USER',
        user: payload
    }
}
// function n the useEffect
export function getUserAuth () {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    }
}
// function to signout
export function signOutAPI () {
    return (dispatch) => {
        auth.signOut().then(()=> {
            dispatch(setUser(null))
        }).catch((error)=> {
            console.log(error)
        })
    }
}
// function to upload photo in fireaseStorage
export function postArticleAPI (payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        
        if (payload.image != ''){
            const upload = storage.ref(`image/${payload.image.name}`).put(payload.image);
            upload.on('state_changed', (snapshot) => { 
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`progress: ${progress}%`);
                if (snapshot.state === 'RUNNING'){
                    console.log(`progress: ${progress}%`);
                }
            }, error => console.log(error.code),
            async () => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
                db.collection('article').add({
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL,
                    },
                    video: payload.video,
                    haredImg: downloadURL,
                    comments: 0,
                    description: payload.description
                })
                dispatch(setLoading(false))
            }
            );
        } else if (payload.video) {
            db.collection('article').add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                haredImg: '',
                comments: 0,
                description: payload.description
            })
            dispatch(setLoading(false))
        }
    }
}
// function to get the articles from the redux store
export function getArticlesAPI () {
    return (dispatch) => {
        let payload;
        
        db.collection('article')
        .orderBy('actor.date', 'desc')
        .onSnapshot((snapshot)=> {
            payload = snapshot.docs.map((doc)=> doc.data());
            console.log(payload)
            dispatch(getArticles(payload))
        })
    }
}
// to catch the articles from the Api firestore
export const getArticles = (payload) => {
    return {
        type: 'GET_ARTICLES',
        payload: payload
    }
}
// function to set up the loading
export const setLoading = (status) => {
    return {
        type: 'SET_LOADING_STATUS',
        status: status
    }
}