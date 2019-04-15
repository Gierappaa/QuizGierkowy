import firebase from 'firebase/app';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyCeyertcCYgV3d68oWU3qtoJGnJ_KwwAdI",
    authDomain: "quizgierkowy.firebaseapp.com",
    databaseURL: "https://quizgierkowy.firebaseio.com",
    projectId: "quizgierkowy",
    storageBucket: "quizgierkowy.appspot.com",
    messagingSenderId: "901517566676"
};
firebase.initializeApp(config);

export default firebase;
