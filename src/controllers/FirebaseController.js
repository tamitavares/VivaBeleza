import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { app } from "./../../firebaseConfig"

const db = getFirestore(app)
const auth = getAuth(app);

export default {app, auth, db};