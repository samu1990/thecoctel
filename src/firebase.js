const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCBBnrtJhrpQ6tXpsW1JDOp6EMiBp2TUfM",
    authDomain: "thecoctel-25f13.firebaseapp.com",
    databaseURL: "https://thecoctel-25f13.firebaseio.com",
    projectId: "thecoctel-25f13",
    storageBucket: "thecoctel-25f13.appspot.com",
    messagingSenderId: "1093301741783",
    appId: "1:1093301741783:web:674d5322f3d07b0c"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { firebase, db, auth, storage }