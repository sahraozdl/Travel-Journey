// src/pages/UserPage/UserTrips.jsx
export default function UserTrips({ trips }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {trips.length === 0 ? (
        <p className="text-gray-500">You haven't added any trips yet.</p>
      ) : (
        trips.map((trip) => (
          <div key={trip.id} className="p-4 border rounded shadow">
            <h3 className="font-bold text-black">{trip.title}</h3>
            <p className="font-light text-black">{trip.text}</p>
          </div>
        ))
      )}
    </div>
  );
}