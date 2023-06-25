// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB8Y3k4n9VI_N4YoDtiPNPY0aZN2pBpac",
  authDomain: "expense2data.firebaseapp.com",
  databaseURL: "https://expense2data-default-rtdb.firebaseio.com",
  projectId: "expense2data",
  storageBucket: "expense2data.appspot.com",
  messagingSenderId: "509217933806",
  appId: "1:509217933806:web:3cd3337256bb660c81a6ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)