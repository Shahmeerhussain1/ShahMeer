// firebaseClient.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyB2UvbC2K2i5LrjrxORBDnnlwJCXA2IIRw",
  authDomain: "turo-1de9d.firebaseapp.com",
  projectId: "turo-1de9d",
  storageBucket: "turo-1de9d.firebasestorage.app",
  messagingSenderId: "1035727491210",
  appId: "1:1035727491210:web:338c57db1b7804ca56dd73"
};

const app = initializeApp(firebaseConfig);

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);