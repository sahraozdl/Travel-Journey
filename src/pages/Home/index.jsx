import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import TravelList from "../TravelList";

export const Home = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const snapshot = await getDocs(collection(db, "travelEntries"));
        const entriesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setEntries(entriesData);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="home">
      {/* You pass travel entried down to TravelList component but don't use it there as a prop and inatead do another API call. 
      I think you don't actually need to keep Home and TravelList as separate components - merge them into one.
      */}
      {loading ? <p>Loading...</p> : 
      <TravelList entries={entries} />}
    </div>
  );
};
