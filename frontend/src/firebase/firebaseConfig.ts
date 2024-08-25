import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
// console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
// console.log(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
// console.log(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
// console.log(import.meta.env.VITE_FIREBASE_APP_ID);
// console.log(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyByxFq6mrkk4GebU6yNaCatSxilOZueP_0",
//   authDomain: "skilltastic-62d7c.firebaseapp.com",
//   projectId: "skilltastic-62d7c",
//   storageBucket: "skilltastic-62d7c.appspot.com",
//   messagingSenderId: "744060435761",
//   appId: "1:744060435761:web:e485ee19e6a5992487c410",
//   measurementId: "G-6HP0JV57P0",
// };

//* initialize-firebase
const app = initializeApp(firebaseConfig);

//* initialize-firebase-auth
const auth = getAuth(app);

//* initialize-firestore
const db = getFirestore(app);

//* initialize-firebase-storage
const storage = getStorage(app);

//* initialize-firebase-analytics
const analytics = getAnalytics(app);

export { auth, db, storage, analytics };
