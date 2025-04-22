// scripts/updateIds.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

// Replace with your actual config (not process.env here)
const firebaseConfig = {
  apiKey: "AIzaSyDduRhkuXbZxABzknImGKZPa-RfAL8r4FQ",
  authDomain: "travel-journal-f11c8.firebaseapp.com",
  projectId: "travel-journal-f11c8",
  storageBucket: "travel-journal-f11c8.firebasestorage.app",
  messagingSenderId: "921623606071",
  appId: "1:921623606071:web:322f162f659dee9219a0b2",
  measurementId: "G-PHJ3FP8DBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function replaceIdFields() {
  const snapshot = await getDocs(collection(db, "travelEntries"));

  snapshot.forEach(async (docSnap) => {
    const docId = docSnap.id;
    const data = docSnap.data();

    if (data.id !== docId) {
      await updateDoc(doc(db, "travelEntries", docId), {
        id: docId,
      });
      console.log(`Updated doc ${docId}`);
    }
  });
}

replaceIdFields();
