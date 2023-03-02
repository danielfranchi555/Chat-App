import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzLVTXeD1F3gQCVPy7Ckxb2mkbisw4e1U",
  authDomain: "chat-firebase-b7b02.firebaseapp.com",
  projectId: "chat-firebase-b7b02",
  storageBucket: "chat-firebase-b7b02.appspot.com",
  messagingSenderId: "226228807855",
  appId: "1:226228807855:web:9550c764da61741a564c5a"
};

const app = initializeApp(firebaseConfig);
export const firebaseConection = ()=> app 
export const auth = getAuth(app)
export const db = getFirestore(app);
