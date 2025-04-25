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

// 🧹 Remove savedTripCount, favoriteTripCount, and addedTripCount from users
async function cleanUserCounts() {
  const snapshot = await getDocs(collection(db, "users"));

  const updates = snapshot.docs.map(async (docSnap) => {
    const docId = docSnap.id;
    const data = docSnap.data();

    const fieldsToDelete = {};

    // Remove savedTripCount, favoriteTripCount, and addedTripCount
    if ("savedTripCount" in data) {
      fieldsToDelete.savedTripCount = deleteField();
    }
    if ("favoriteTripCount" in data) {
      fieldsToDelete.favoriteTripCount = deleteField();
    }
    if ("addedTripCount" in data) {
      fieldsToDelete.addedTripCount = deleteField();
    }

    if (Object.keys(fieldsToDelete).length > 0) {
      await updateDoc(doc(db, "users", docId), fieldsToDelete);
      console.log(`🧹 Cleaned counts from user: ${docId}`, fieldsToDelete);
    } else {
      console.log(`✔️ User ${docId} doesn't have counts to delete.`);
    }
  });

  await Promise.all(updates);
  console.log("🎉 All user counts removed.");
}

// Run the cleanup process
async function runFixes() {
  await cleanUserCounts();
}

runFixes().catch(console.error);
