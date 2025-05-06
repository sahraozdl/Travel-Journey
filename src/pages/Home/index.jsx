import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Tripcard from "../../components/TripCard"

export const Home = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const snapshot = await getDocs(collection(db, "travelEntries"));
        const entriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
           ...doc.data(),
         
        }));
        setEntries(entriesData);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="home">
      <section className="max-w-screen-md">
            {entries.map((entry) => {
              return <Tripcard key={entry.id} entry={entry} />;
            })}
          </section>
    </div>
  );
};
