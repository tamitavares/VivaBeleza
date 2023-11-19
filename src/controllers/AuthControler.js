// imports

import { app } from './../../../firebaseConfig'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

export default class AuthController {
    constructor() {
        this.auth = getAuth(app);
    }

    async authSignUp(email, password) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user;
            })
            .catch(console.error("Error in SignUp"));
    }

    //SignIn

    async authSignIn(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password).then(
            (userCredential) => {
                const user = userCredential.user;
                return user;
            }
        );
    }

    //Get Current User

    async authGetCurrentUser() {
        const user = this.auth.currentUser;
        if (user) {
            console.log("User is signed in");
        } else {
            console.log("User is signed out");
        }
        return user;
    }

    //SignOut

    async authSignOut() {
        return signOut(this.auth).then(() => {
            console.log("signOut successful");
        });
    }
}