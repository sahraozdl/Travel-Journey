import { likeTrip, unlikeTrip } from "../../utils/firebaseActions";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { HeartIcon as UnlikeHeart} from "@heroicons/react/24/outline";
import { HeartIcon as LikeHeart } from "@heroicons/react/24/solid";

const LikeButton = ({ id }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!user || !user.id || !id) return;
      try {
        const tripRef = doc(db, "travelEntries", id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
          const likedBy = tripSnap.data().likedBy || [];
          setIsLiked(likedBy.includes(user.id));
        }
      } catch (err) {
        console.error("Error checking liked status:", err.message);

        console.log("User:", user);
        console.log("Entry ID:", id);

        setUserMessage("Error checking liked status. Please try again.");
        setTimeout(() => {
          setUserMessage("");
        }, 3000);
      }
    };
    checkIfLiked();
  }, [user, id]);

  const toggleLike = async () => {
    if (!user || !user.id) {
      console.error("User is not logged in or User ID is missing");
      setUserMessage("Please log in to like this trip.");
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
      if (isLiked) {
        await unlikeTrip(user, id);
      } else {
        await likeTrip(user, id);
      }
      setIsLiked((prevState) => !prevState);
    } catch (err) {
      console.error("Error toggling like:", err.message);
      setUserMessage("Error toggling like. Please try again.");
      setTimeout(() => {
        setUserMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <button onClick={toggleLike}>{isLiked ? <LikeHeart className="h-6 w-6 text-red-900"/> : <UnlikeHeart className="h-6 w-6 text-red-900"/>}</button>
      {userMessage && <p className="text-red-800 text-base">{userMessage}</p>}
    </>
  );
};

export default LikeButton;
