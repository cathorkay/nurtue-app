// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-WcLtICeHNkR10CLNMKO0NvOi2lUJEBM",
  authDomain: "nurtue-9a580.firebaseapp.com",
  projectId: "nurtue-9a580",
  storageBucket: "nurtue-9a580.appspot.com",
  messagingSenderId: "712681320017",
  appId: "1:712681320017:web:6d257c23b751eddd5e5270",
  measurementId: "G-XC57CT6WL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

//const analytics = getAnalytics(app);
