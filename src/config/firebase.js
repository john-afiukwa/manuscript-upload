import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbrs2E9y64nUVOsPQnmH9VdPI9WOFOJls",
  authDomain: "jbsmr-users.firebaseapp.com",
  projectId: "jbsmr-users",
  storageBucket: "jbsmr-users.appspot.com",
  messagingSenderId: "222018187006",
  appId: "1:222018187006:web:4e68f1a3eb0aa7c4957faf",
  measurementId: "G-E3SETMHE7F",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();

export default app;
