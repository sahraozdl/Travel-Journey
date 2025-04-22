import { likeTrip, unlikeTrip } from "../../utils/firebaseActions";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const LikeButton = ({ user, trip }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userMessage, setUserMessage] = useState("");

  // Check if the user already liked the trip
  useEffect(() => {
    if (!user) {
      setIsUserLoggedIn(false); // Not logged in
      return;
    }

    const checkIfLiked = async () => {
      if (user && trip?.id) {
        const tripRef = doc(db, "travelEntries", trip.id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
          const likedBy = tripSnap.data().likedBy || [];
          setIsLiked(likedBy.includes(user.uid));
        }
      }
    };

    checkIfLiked();
  }, [user, trip]);

  const toggleLike = async () => {
    if (!user) {
      // If user isn't logged in, show a message
      setUserMessage("Please log in to like this trip.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000); // Clear message after 3 seconds
      return;
    }
    try {
      if (isLiked) {
        await unlikeTrip(user.uid, trip.id);
        setIsLiked(false);
      } else {
        await likeTrip(user.uid, trip.id);
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Error toggling like:", err.message);
      setUserMessage("Error toggling like. Please try again.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000); // Clear message after 3 seconds
    }
  };

  return (
    <>
    <button onClick={toggleLike}>
      {isLiked ? "💖 Unlike" : "🤍 Like"}
    </button>
    {!isUserLoggedIn && (
      <p className="text-red-800 text-base">
       {userMessage}
      </p>
    )}
    </>
  );
};

export default LikeButton;
