import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAuycjRnqMDiU4kZVu9x5483zYdv2dDiyI",
  authDomain: "ever-note-fb11e.firebaseapp.com",
  projectId: "ever-note-fb11e",
  storageBucket: "ever-note-fb11e.appspot.com",
  messagingSenderId: "1015717778700",
  appId: "1:1015717778700:web:140dc4bc42a5107bdc2529",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };

export default firebase;
