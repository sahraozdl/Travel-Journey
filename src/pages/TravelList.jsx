import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import Entry from "../components/TripCard/index.jsx";

export default function TravelList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "travelEntries"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      {entries.map((entry) => {
        return <Entry key={entry.id} entry={entry} />;
      })}
    </section>
  );
}
