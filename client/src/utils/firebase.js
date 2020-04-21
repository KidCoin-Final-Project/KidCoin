import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9ew_9iMQmH1S75szMrrIQHHd-HuxRRSY",
    authDomain: "kidcoin-7654b.firebaseapp.com",
    databaseURL: "https://kidcoin-7654b.firebaseio.com",
    projectId: "kidcoin-7654b",
    storageBucket: "kidcoin-7654b.appspot.com",
    messagingSenderId: "812628455494",
    appId: "1:812628455494:web:96f4b5872119719be81a47",
    measurementId: "G-BS6BSCRD25"
  }

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();