import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB0XYadlCQKXIavL1ZovMtub5xCMIQuXmM",
    authDomain: "mangaka-chouaib.firebaseapp.com",
    projectId: "mangaka-chouaib",
    storageBucket: "mangaka-chouaib.appspot.com",
    messagingSenderId: "813113029140",
    appId: "1:813113029140:web:9e2696b8a46b546df3ad01"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();