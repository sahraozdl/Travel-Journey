import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export const useAuth = () => {
  return useContext(UserContext);
};

export async function signUpUser(email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    name: user.username || "Anonymous",
    email: user.email,
    addedTrip: [],
    addedTripCount: 0,
    savedTrips: [],
    savedTripCount: 0,
    favoriteTrip: [],
    favoriteTripCount: 0,
    createdAt: new Date(),
  });

  return { id: user.uid, email: user.email, name: username };
}

export async function signInUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return { id: user.uid, email: user.email };
}
