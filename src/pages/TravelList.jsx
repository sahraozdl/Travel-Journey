import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
// It would be better to use TripCard (name of the actual component) when importing it here. Using a different name is confusing.
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
      {/* It would be good to restrict max possible width here (on the section, for example) as it get's a bit hard to read on larger screen. */}
      {entries.map((entry) => {
        return <Entry key={entry.id} entry={entry} />;
      })}
    </section>
  );
}
