import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, useAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeO2dg-zUuSJEboYFjm-5KSLfuRYiRS3Y",
  authDomain: "modern-blog-today.firebaseapp.com",
  projectId: "modern-blog-today",
  storageBucket: "modern-blog-today.appspot.com",
  messagingSenderId: "131140930493",
  appId: "1:131140930493:web:a3b38f112fd641bb6620d4",
  measurementId: "G-K0WGPBRG9Q",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, db, storage, auth, googleAuthProvider };
