import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
	apiKey: "AIzaSyDY9WW-GCZxcH9R1yBCCtWGe-XnvYpYnUA",
	authDomain: "reactnativehw.firebaseapp.com",
	projectId: "reactnativehw",
	storageBucket: "reactnativehw.appspot.com",
	messagingSenderId: "830782815158",
	appId: "1:830782815158:web:0b5101cfb95a3a18e3df17",
	measurementId: "G-BBYM63RTV7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);