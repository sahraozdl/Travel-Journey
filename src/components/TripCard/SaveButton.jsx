import { saveTrip, unsaveTrip } from "../../utils/firebaseActions";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const SaveButton = ({ user, trip }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (!user) {
      setIsUserLoggedIn(false); // Not logged in
      return;
    }
    const checkIfSaved = async () => {
      if (user && trip?.id) {
        const tripRef = doc(db, "travelEntries", trip.id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
          const savedBy = tripSnap.data().savedBy || [];
          setIsSaved(savedBy.includes(user.uid));
        }
      }
    };

    checkIfSaved();
  }, [user, trip]);

  const toggleSave = async () => {
    if (!user) {
      // If user isn't logged in, show a message
      setUserMessage("Please log in to save this trip.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000); // Clear message after 3 seconds
      return;
    }
    try {
      if (isSaved) {
        await unsaveTrip(user.uid, trip.id);
        setIsSaved(false);
      } else {
        await saveTrip(user.uid, trip.id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling save:", err.message);
      setUserMessage("Error toggling like. Please try again.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000); // Clear message after 3 seconds
    }
  };

  return (
    <>
    <button onClick={toggleSave}>
      {isSaved ? "Unsave" : "Save"}
    </button>
    {!isUserLoggedIn && (
      <p className="text-red-800 text-base">
       {userMessage}
      </p>
    )}
    </>
  );
};
export default SaveButton;