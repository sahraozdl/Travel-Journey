// src/pages/UserPage/UserTrips.jsx
import { useState } from "react";
import AddTripForm from "../../components/AddTripForm";
import TripList from "../../components/TripList";

export default function UserTrips({ trips, setTrips }) {
  const [showForm, setShowForm] = useState(false);

  const handleTripAdded = (newTrip) => {
    setTrips((prev) => [newTrip, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4">My Trips</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-800 z-50"
      >
        {showForm ? "Cancel" : "Add New Trip"}
      </button>

      {showForm && (
        <div className="border p-4 rounded shadow bg-white mt-2">
          <AddTripForm onTripAdded={handleTripAdded} />
        </div>
      )}

      <TripList trips={trips} />
    </div>
  );
}
