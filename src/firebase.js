// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYnFRaFZ50PeG7mCzbRdeabKZPEC64Y4E",
  authDomain: "fiscal-81b99.firebaseapp.com",
  projectId: "fiscal-81b99",
  storageBucket: "fiscal-81b99.appspot.com",
  messagingSenderId: "88849407256",
  appId: "1:88849407256:web:4ac4af882cd1d62d19d26d",
  measurementId: "G-PVYDK2D949"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);