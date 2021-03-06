import db, { auth, provider, storage } from '../../firebase';
export const SET_USER = 'SET_USER';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_FRIENDS = 'GET_FRIENDS';


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
// export function postComentAPI (payload, id){
//             console.log('post comment ap')
//                db.collection('article').add({
//                     postComment:{
//                         pic: payload.user.photoURL,
//                         titleCom: payload.user.displayName,
//                         texte : payload.texte
//                     }
//                 })
// }

// function to upload photo in fireaseStorage
export function postArticleAPI (payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        if (payload.image // si y'a une image
            // != ''  
            ){
                console.log('dans image payload')
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
                    description: payload.description,
                    like: 0,
                    post: false,
                    postComment:{}
                }).then(docRef => {
                    console.log('reference id de la data creer', docRef.id)
                })
                dispatch(setLoading(false))
            }
            );
        }
        //  else 
        if (payload.video) {
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
                description: payload.description,
                like: 0,
                post: false,
                postComment:{}
            })
            dispatch(setLoading(false))
        } else if(payload.description && payload.image  === ''){
            db.collection('article').add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: '',
                haredImg: '',
                comments: 0,
                description: payload.description,
                like: 0,
                post: false,
                postComment:{}
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
            payload = snapshot.docs.map((doc)=> (
                {
                    info:doc.data(), 
                    id:doc.id}
                ));
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


export function getFriendAPI () {
    return (dispatch) => {
        let payload;
        
        db.collection('friend')
        .onSnapshot((snapshot)=> {
            payload = snapshot.docs.map((doc)=> doc.data());
            console.log(payload)
            dispatch(getFriend(payload))
        })
    }
}

export const getFriend = (payload) => {
    return {
        type: 'GET_FRIENDS',
        payload: payload
    }
}