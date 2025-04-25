// src/components/AddTripForm.jsx
import { useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router";

export default function AddTripForm({ onTripAdded }) {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const navigate = useNavigate();
  const handlePlaceSelected = (mapUrl) => {
    setLocationLink(mapUrl); // already a string now
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const newTripRef = await addDoc(collection(db, "travelEntries"), {
        title: e.target.title.value,
        country: e.target.country.value,
        dates: e.target.dates.value,
        googleMapsLink: locationLink,
        text: e.target.text.value,
        userId: currentUser.id,
        createdAt: serverTimestamp(),
      });

      await updateDoc(newTripRef, {
        id: newTripRef.id,  // This assigns the Firestore-generated document ID to the `id` field in the document
      });

      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        addedTrip: [...(currentUser.addedTrip || []), newTripRef.id],
      });

      onTripAdded && onTripAdded({ id: newTripRef.id });
      setUserMessage("Trip added!");
      //add nav to main travel list
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error adding trip", error);
      setUserMessage("Error adding trip", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Trip Title" required />
      <input name="country" placeholder="Country" required />
      <input name="dates" placeholder="12 Jan - 18 Jan, 2025" required />
      <textarea name="text" placeholder="Description" required />

      {/* search input style later */}
      <LocationSearch onPlaceSelected={handlePlaceSelected} />

      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
        {loading ? "Adding..." : "Add Trip"}
      </button>
      {userMessage && <p>{userMessage}</p>}
    </form>
  );
}
