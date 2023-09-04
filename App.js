import { initializeApp } from "firebase/app";

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

import SignIn from './src/views/public/SignIn'

export default function App() {
  return (
    <SignIn></SignIn>
  );
}


