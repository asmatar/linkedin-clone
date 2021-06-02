import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCW8d8WFLbROd-lhHXNHkEHXgK6cT_LyEk",
    authDomain: "linkedin-clone-586df.firebaseapp.com",
    projectId: "linkedin-clone-586df",
    storageBucket: "linkedin-clone-586df.appspot.com",
    messagingSenderId: "878655239386",
    appId: "1:878655239386:web:20d054043d7f90866961e3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
// to export import photos 
const storage = firebase.storage()

export { auth, provider, storage };

export default db; 

