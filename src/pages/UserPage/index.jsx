//src/pages/UserPage/index.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../config/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function UserPage() {
  const user = useAuth();
  const [activeTab, setActiveTab] = useState("liked");
  const [likedTrips, setLikedTrips] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    // Fetch user data
    const fetchUserInfo = async () => {
      const userRef = doc(db, "users", user.id);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      }
    };

    // Fetch liked trips
    const fetchLikedTrips = async () => {
      const q = query(
        collection(db, "travelEntries"),
        where("likedBy", "array-contains", user.id)
      );
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLikedTrips(trips);
    };

    // Fetch saved trips
    const fetchSavedTrips = async () => {
      const q = query(
        collection(db, "travelEntries"),
        where("savedBy", "array-contains", user.id)
      );
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedTrips(trips);
    };

    fetchUserInfo();
    fetchLikedTrips();
    fetchSavedTrips();
  }, [user]);

  if (!user) return <p className="p-4">Please log in to see your profile.</p>;

  const renderTrips = (trips) => (
    <div className="grid grid-cols-1 gap-4">
      {trips.map((trip) => (
        <div key={trip.id} className="p-4 border rounded shadow">
          <h3 className="font-bold">{trip.title}</h3>
          <p>{trip.description}</p>
        </div>
      ))}
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
        {["liked", "saved", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "liked" && renderTrips(likedTrips)}
        {activeTab === "saved" && renderTrips(savedTrips)}
        {activeTab === "settings" && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Settings</h2>
            <p>Profile settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
