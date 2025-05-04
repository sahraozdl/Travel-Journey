import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";

export async function signUpUser(email, password,username) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    email: user.email,
    name: username || "Anonymous",
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

export async function signInUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export function signOutUser() {
  return signOut(auth);
}
