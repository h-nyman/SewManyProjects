import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyAGIZtGEXpEqvN87O-pKcBIfKXP9suIJ28",
    authDomain: "sewmanyprojects.firebaseapp.com",
    projectId: "sewmanyprojects",
    storageBucket: "sewmanyprojects.firebasestorage.app",
    messagingSenderId: "1051605494564",
    appId: "1:1051605494564:web:469b3ced687f0e5f6921b1"
}

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function loginUser(email: string, password: string) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)

        console.log(res)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
    
}

export async function createUser(email: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        console.log(res)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
    
}

export function logOut() {
    signOut(auth)
}