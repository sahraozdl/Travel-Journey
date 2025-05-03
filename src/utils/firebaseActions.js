import { db } from "../config/firebase.js";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

export async function saveTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);
  try {
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const savedTrips = userData.savedTrips || [];

    if (!savedTrips.includes(id)) {
      await updateDoc(tripRef, {
        savedBy: arrayUnion(user.id),
      });

      await updateDoc(userRef, {
        savedTrips: [...savedTrips, id],
        savedTripCount: savedTrips.length + 1,
      });
    }
  } catch (err) {
    console.error("Error saving trip:", err.message);
  }
}

export async function unsaveTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);

  try {
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const savedTrips = userData.savedTrips || [];

    const updatedTrips = savedTrips.filter((tripId) => tripId !== id);

    if (savedTrips.includes(id)) {
      await updateDoc(tripRef, {
        savedBy: arrayRemove(user.id),
      });
      await updateDoc(userRef, {
        savedTrips: updatedTrips,
        savedTripCount: updatedTrips.length,
      });
    }
  } catch (err) {
    console.error("Error unsaving trip:", err.message);
  }
}

export async function likeTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);

  try {
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const favoriteTrips = userData.favoriteTrip || [];

    if (!favoriteTrips.includes(id)) {
      await updateDoc(tripRef, {
        likedBy: arrayUnion(user.id),
      });
      await updateDoc(userRef, {
        favoriteTrip: [...favoriteTrips, id],
        favoriteTripCount: favoriteTrips.length + 1,
      });
    }
  } catch (err) {
    console.error("Error liking trip:", err.message);
  }
}

export async function unlikeTrip(user, id) {
  const userRef = doc(db, "users", user.id);
  const tripRef = doc(db, "travelEntries", id);

  try {
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const favoriteTrips = userData.favoriteTrip || [];
    const updatedTrips = favoriteTrips.filter((tripId) => tripId !== id);

    if (favoriteTrips.includes(id)) {
      await updateDoc(tripRef, {
        likedBy: arrayRemove(user.id),
      });
      await updateDoc(userRef, {
        favoriteTrip: updatedTrips,
        favoriteTripCount: updatedTrips.length,
      });
    }
  } catch (err) {
    console.error("Error unliking trip:", err.message);
  }
}
