import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDpLj0bxaASHsoaCqsjjO55AHE1tj1r8xw",
    authDomain: "fileuploader-3e21f.firebaseapp.com",
    databaseURL: "https://fileuploader-3e21f.firebaseio.com",
    projectId: "fileuploader-3e21f",
    storageBucket: "fileuploader-3e21f.appspot.com",
    messagingSenderId: "147050387453",
    appId: "1:147050387453:web:02e2e32c4d5bc508e22b94"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()


export {
    storage, firebase as default
};

