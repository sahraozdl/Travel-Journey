import { saveTrip, unsaveTrip } from "../../utils/firebaseActions";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";

const SaveButton = ({ id }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user || !user.id || !id) return;
      try {
        const tripRef = doc(db, "travelEntries", id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
          const savedby = tripSnap.data().savedBy || [];
          setIsSaved(savedby.includes(user.id));
        }
      } catch (err) {
        console.error("Error checking saved status:", err.message);
        setUserMessage("Error checking saved status. Please try again.");
        setTimeout(() => {
          setUserMessage("");
        }, 3000); // Clear message after 3 seconds
      }
    };
    checkIfSaved();
  }, [user, id]);

  const toggleSave = async () => {
    if (!user || !user.id) {
      console.error("User is not logged in or User ID is missing");
      setUserMessage("Please log in to save this trip.");
      console.log("User in toggleSave:", user);
      console.log("Entry ID in toggleSave:", id);
      setTimeout(() => {
        setUserMessage("");
      }, 3000); // Clear message after 3 seconds
      return;
    }
    if (!id) {
      setUserMessage("Trip not found.");
      return;
    }
    try {
      if (isSaved) {
        await unsaveTrip(user, id);
      } else {
        await saveTrip(user, id);
      }
      setIsSaved((prevState) => !prevState); // Toggle the saved state
    } catch (err) {
      console.error("Error toggling save:", err.message);
      console.log("User in (ifissaved) toggleSave:", user);
      console.log("Entry ID (ifissaved) in toggleSave:", id);
      setUserMessage("Error toggling like. Please try again.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000); // Clear message after 3 seconds
    }
  };

  return (
    <>
      <button onClick={toggleSave}>{isSaved ? "Unsave" : "Save"}</button>
      {userMessage && <p className="text-red-800 text-base">{userMessage}</p>}
    </>
  );
};
export default SaveButton;
