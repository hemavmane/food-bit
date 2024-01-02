// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNeDPMRmgiK1IyF3WOp581Y4CKcnpVJ4M",
  authDomain: "food-bit-66616.firebaseapp.com",
  projectId: "food-bit-66616",
  storageBucket: "food-bit-66616.appspot.com",
  messagingSenderId: "224552627760",
  appId: "1:224552627760:web:bb3781c8ecea46324487f5",
  measurementId: "G-32H6NHGX39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


 export  const auth = getAuth(app)