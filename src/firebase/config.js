import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAuycjRnqMDiU4kZVu9x5483zYdv2dDiyI",
  authDomain: "ever-note-fb11e.firebaseapp.com",
  projectId: "ever-note-fb11e",
  storageBucket: "ever-note-fb11e.appspot.com",
  messagingSenderId: "1015717778700",
  appId: "1:1015717778700:web:140dc4bc42a5107bdc2529",
});

const projectFirestore = firebase.firestore();

export { projectFirestore };

export default firebase;
