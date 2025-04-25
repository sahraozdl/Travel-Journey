// src/updateIds.js

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDduRhkuXbZxABzknImGKZPa-RfAL8r4FQ",
  authDomain: "travel-journal-f11c8.firebaseapp.com",
  projectId: "travel-journal-f11c8",
  storageBucket: "travel-journal-f11c8.appspot.com",
  messagingSenderId: "921623606071",
  appId: "1:921623606071:web:322f162f659dee9219a0b2",
  measurementId: "G-PHJ3FP8DBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

