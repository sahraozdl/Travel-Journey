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
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function AddTripForm({ onTripAdded }) {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const navigate = useNavigate();
  const handlePlaceSelected = (mapUrl) => {
    setLocationLink(mapUrl);
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
        id: newTripRef.id, //to add added trips a id as doc.uid
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <span className="flex flex-row items-center justify-between">
        <label htmlFor="country" className="label">
          Country:
        </label>
        <input
          id="country"
          name="country"
          placeholder="Country"
          className="input"
          required
        />
        <MapPinIcon className="h-10 w-16 text-red-900 px-2" />
        {/* search input style later */}
        <LocationSearch onPlaceSelected={handlePlaceSelected} />
      </span>
      <span className="flex flex-row items-center justify-stretch">
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          id="title"
          name="title"
          placeholder="Trip Title"
          className="input"
          required
        />
        <label htmlFor="dates" className="label">
          Dates:
        </label>
        <input
          id="dates"
          name="dates"
          placeholder="12 Jan - 18 Jan, 2025"
          className="input"
          required
        />
      </span>
      <label className="label" htmlFor="description">
        Description:
      </label>
      <textarea
        id="description"
        name="text"
        placeholder="Description"
        className="input w-full h-36"
        required
      />

      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 my-4 rounded hover:bg-red-900 "
      >
        {loading ? "Adding..." : "Add Trip"}
      </button>
      {userMessage && (
        <p className="text-red-700 font-normal text-base">{userMessage}</p>
      )}
    </form>
  );
}
