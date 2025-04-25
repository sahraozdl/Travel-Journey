// src/utils/firebaseActions.js

import { db } from "../config/firebase.js";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

// Save a trip to the user's savedTrips
export async function saveTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);
  try {
    await updateDoc(tripRef, {
      savedBy: arrayUnion(user.id),
    });

    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const updatedSavedTrips = [...(userData.savedTrips || []), id];

    await updateDoc(userRef, {
      savedTrips: updatedSavedTrips,
    });
  } catch (err) {
    console.error("Error saving trip:", err.message);
  }
}

// Unsave a trip
export async function unsaveTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);

  try {
    await updateDoc(tripRef, {
      savedBy: arrayRemove(user.id),
    });

    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const updatedSavedTrips = (userData.savedTrips || []).filter(
      (id) => id !== id
    );

    await updateDoc(userRef, {
      savedTrips: updatedSavedTrips,
    });
  } catch (err) {
    console.error("Error unsaving trip:", err.message);
  }
}

// Like a trip
export async function likeTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);

  try {
    await updateDoc(tripRef, {
      likedBy: arrayUnion(user.id),
    });

    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const updatedFavoriteTrips = [...(userData.favoriteTrip || []), id];

    await updateDoc(userRef, {
      favoriteTrip: updatedFavoriteTrips,
    });
  } catch (err) {
    console.error("Error liking trip:", err.message);
  }
}

// Unlike a trip
export async function unlikeTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);

  try {
    await updateDoc(tripRef, {
      likedBy: arrayRemove(user.id),
    });
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const updatedFavoriteTrips = (userData.favoriteTrip || []).filter(
      (id) => id !== id
    );
    await updateDoc(userRef, {
      favoriteTrip: updatedFavoriteTrips,
    });
  } catch (err) {
    console.error("Error unliking trip:", err.message);
  }
}
