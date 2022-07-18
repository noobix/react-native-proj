// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMsWPMwUl3YicbZYvv8QgnmqHJFC7V1ps",
  authDomain: "far-search.firebaseapp.com",
  projectId: "far-search",
  storageBucket: "gs://far-search.appspot.com",
  messagingSenderId: "965557732365",
  appId: "1:965557732365:web:6e0109f4d8cf22d34b8144"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)
export const storage = getStorage(app)
