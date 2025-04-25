//src/config/auth.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";

// Sign Up Logic
export async function signUpUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Save user to Firestore
  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    email: user.email,
    name: user.name || "Anonymous",
    addedTrip: [],
    addedTripCount: 0,
    savedTrips: [],
    savedTripCount: 0,
    favoriteTrip: [],
    favoriteTripCount: 0,
    createdAt: new Date(),
  });

  return user;
}

// Sign In Logic
export async function signInUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

// Sign Out Logic
export function signOutUser() {
  return signOut(auth);
}
