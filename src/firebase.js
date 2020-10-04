import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFtTwjAzBlD7wElAh2s5VubFI-0sS6-t0",
    authDomain: "clone-83c93.firebaseapp.com",
    databaseURL: "https://clone-83c93.firebaseio.com",
    projectId: "clone-83c93",
    storageBucket: "clone-83c93.appspot.com",
    messagingSenderId: "148710203238",
    appId: "1:148710203238:web:4191107801e10fe5e2b2a7",
    measurementId: "G-3D5FW4BPNF"
};

// we are initialising firebaseApp varaible using initialiseApp function by passing imported firebaseConfig
const firebaseApp=firebase.initializeApp(firebaseConfig);

// we will be initialising database using fireBaseApp varaible by using firestore function
// firestore()- realtime db in firebase
const db= firebaseApp.firestore();

//auth variable will b eused for handling all sign in related functionality
const auth= firebase.auth();

// export to use auth and db outside of firebase.js file
export  { db, auth}; 