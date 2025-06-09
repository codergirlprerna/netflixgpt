// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgJ6FFrgq6WAzJhID7dJBC74rhFthnKqE",
  authDomain: "netflixgpt-7fce0.firebaseapp.com",
  projectId: "netflixgpt-7fce0",
  storageBucket: "netflixgpt-7fce0.appspot.com",  // ✅ fixed
  messagingSenderId: "88341307215",
  appId: "1:88341307215:web:4d8b77515867755f9cef3a",
  measurementId: "G-H353WKRS05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);