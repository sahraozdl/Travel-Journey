import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import UserSettings from "./UserSettings";
import UserTrips from "./UserTrips";
import TripList from "../../components/TripList/index";

export default function UserPage() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("liked");
  const [likedTrips, setLikedTrips] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", currentUser.id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserInfo(data);

          const favoriteTripIds = data.favoriteTrip || [];
          setLikedTrips(await fetchTripsByIds(favoriteTripIds));

          const savedTripIds = data.savedTrips || [];
          setSavedTrips(await fetchTripsByIds(savedTripIds));

          const userAddedTripIds = data.addedTrip || [];
          setUserTrips(await fetchTripsByIds(userAddedTripIds));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const fetchTripsByIds = async (tripIds) => {
    const trips = await Promise.all(
      tripIds.map(async (tripId) => {
        try {
          const tripRef = doc(db, "travelEntries", tripId);
          const tripSnap = await getDoc(tripRef);
          return tripSnap.exists() ? { id: tripSnap.id, ...tripSnap.data() } : null;
        } catch (err) {
          console.error(`Error fetching trip ${tripId}:`, err);
          return null;
        }
      })
    );
    return trips.filter(Boolean);
  };

  if (!currentUser) return <p className="p-4">Please log in to see your profile.</p>;

  const renderTrips = (trips) => (
    <div className="grid grid-cols-1 gap-4">
      {trips.length === 0 ? (
        <p className="text-gray-500">No trips found.</p>
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">{userInfo?.name || "Anonymous"}</h1>
        <p className="text-gray-600">{userInfo?.email}</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b mb-4">
        {[ "trips","liked", "saved", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 border-b-2 ${
              activeTab === tab
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "trips" && <UserTrips trips={userTrips} />}
        {activeTab === "liked" && <TripList trips={likedTrips} emptyMessage="No liked trips." />}
        {activeTab === "saved" && <TripList trips={savedTrips} emptyMessage="No saved trips." />}
        {activeTab === "settings" && <UserSettings />}
      </div>
    </div>
  );
}
