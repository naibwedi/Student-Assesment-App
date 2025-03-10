// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjWMLIU-CCGnkQjDjeCJH3irfPaq8ctMo",
  authDomain: "student-assessment-dashb-6884c.firebaseapp.com",
  projectId: "student-assessment-dashb-6884c",
  storageBucket: "student-assessment-dashb-6884c.firebasestorage.app",
  messagingSenderId: "47012535167",
  appId: "1:47012535167:web:6629a759650cc8926ed84a",
  measurementId: "G-RG9VX6ZEVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };