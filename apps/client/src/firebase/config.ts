// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4kCrLL2sMIm6VovYAMLYWJBX7Q7e_S2A",
  authDomain: "lume-b4bff.firebaseapp.com",
  projectId: "lume-b4bff",
  storageBucket: "lume-b4bff.firebasestorage.app",
  messagingSenderId: "475875271122",
  appId: "1:475875271122:web:d3992f5993b6e11a15a80b",
  measurementId: "G-Q6WTEFS373",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
