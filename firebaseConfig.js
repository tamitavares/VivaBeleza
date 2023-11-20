import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const db = getFirestore(app)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app, auth, db};