export default function TripList({ trips, emptyMessage = "No trips found." }) {
  if (!trips || trips.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {trips.map((trip) => (
        <div key={trip.id} className="p-4 border rounded shadow">
          <h3 className="font-bold text-black">{trip.title}</h3>
          <p className="font-light text-black">{trip.text}</p>
        </div>
      ))}
    </div>
  );
}
