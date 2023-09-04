import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAnG5bzp7EwoO8YPLJZsllECC9Y1-LMKQM",
  authDomain: "vivabeleza-e025c.firebaseapp.com",
  projectId: "vivabeleza-e025c",
  storageBucket: "vivabeleza-e025c.appspot.com",
  messagingSenderId: "170789247063",
  appId: "1:170789247063:web:d17b9068af189e62c1ab12",
  measurementId: "G-37LK1XGT6Y"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);