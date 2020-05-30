import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC80UGxUDxXAuIxmKxU07ZxweBrW3kgJ5o",
  authDomain: "kidcoin-7654b.firebaseapp.com",
  databaseURL: "https://kidcoin-7654b.firebaseio.com",
  projectId: "kidcoin-7654b",
  storageBucket: "kidcoin-7654b.appspot.com",
  messagingSenderId: "812628455494",
  appId: "1:812628455494:web:96f4b5872119719be81a47",
  measurementId: "G-BS6BSCRD25"
};

  firebase.initializeApp(firebaseConfig);
  const Auth = firebase.auth();
  export default Auth;