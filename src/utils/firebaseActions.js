// src/utils/firebaseActions.js

import { db } from "../config/firebase.js";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Save a trip to the user's savedTrips
export async function saveTrip(userId, tripId) {
  const userRef = doc(db, "users", userId);
  const tripRef = doc(db, "travelEntries", tripId); // ✅ fixed

  await updateDoc(userRef, {
    savedTrips: arrayUnion(tripId),
  });

  await updateDoc(tripRef, {
    savedBy: arrayUnion(userId),
  });
}

// Unsave a trip
export async function unsaveTrip(userId, tripId) {
  const userRef = doc(db, "users", userId);
  const tripRef = doc(db, "travelEntries", tripId); // ✅ fixed

  await updateDoc(userRef, {
    savedTrips: arrayRemove(tripId),
  });

  await updateDoc(tripRef, {
    savedBy: arrayRemove(userId),
  });
}

// Like a trip
export async function likeTrip(userId, tripId) {
  const tripRef = doc(db, "travelEntries", tripId); // ✅ fixed
  await updateDoc(tripRef, {
    likedBy: arrayUnion(userId),
  });
}

// Unlike a trip
export async function unlikeTrip(userId, tripId) {
  const tripRef = doc(db, "travelEntries", tripId); // ✅ fixed
  await updateDoc(tripRef, {
    likedBy: arrayRemove(userId),
  });
}
