import { saveTrip, unsaveTrip } from "../../utils/firebaseActions";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { BookmarkIcon as SaveIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as UnsaveIcon } from "@heroicons/react/24/solid";

const SaveButton = ({ id }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const fetchSaveStatus = async () => {
      if (!user || !id) return;
      try {
        const tripRef = doc(db, "travelEntries", id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
          const savedBy = tripSnap.data().savedBy || [];
          setSaveCount(savedBy.length);
          setIsSaved(savedBy.includes(user.id));
        }
      } catch (err) {
        console.error("Error fetching save data:", err.message);
        setUserMessage("Error fetching save status.");
        setTimeout(() => setUserMessage(""), 3000);
      }
    };

    fetchSaveStatus();
  }, [user, id]);

  const toggleSave = async () => {
    if (!user || !user.id) {
      console.error("User is not logged in or User ID is missing");
      setUserMessage("Please log in to save this trip.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000);
      return;
    }

    if (!id) {
      setUserMessage("Trip not found.");
      return;
    }

    try {
      if (isSaved) {
        await unsaveTrip(user, id);
        setIsSaved(false);
      } else {
        await saveTrip(user, id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling save:", err.message);
      setUserMessage("Failed to toggle save. Try again.");
      setTimeout(() => setUserMessage(""), 3000);
    }
  };

  return (
    <>
      <button onClick={toggleSave}>
        {isSaved ? (
          <UnsaveIcon className="h-6 w-6 text-yellow-700" />
        ) : (
          <SaveIcon className="h-6 w-6 text-yellow-700" />
        )}
      </button>
      {/* Move the count inside the button, it will look and work better this way since the icon and count are connected to each other. */}
      <p className="text-gray-600 text-sm">{saveCount}</p>
      {userMessage && <p className="text-red-800 text-base">{userMessage}</p>}
    </>
  );
};

export default SaveButton;
