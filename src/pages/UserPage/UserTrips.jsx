// src/pages/UserPage/UserTrips.jsx
import AddTripForm from "../../components/AddTripForm";
import TripList from "../../components/TripList";

export default function UserTrips({ trips, setTrips }) {
  const handleTripAdded = (newTrip) => {
    setTrips((prev) => [newTrip, ...prev]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Trips</h2>
      <AddTripForm onTripAdded={handleTripAdded} />
      <TripList trips={trips} />
    </div>
  );
}