import { likeTrip, unlikeTrip } from "../../utils/firebaseActions";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { HeartIcon as UnlikeHeart } from "@heroicons/react/24/outline";
import { HeartIcon as LikeHeart } from "@heroicons/react/24/solid";

const LikeButton = ({ id }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user || !id) return;
      try {
        const tripRef = doc(db, "travelEntries", id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
          const likedBy = tripSnap.data().likedBy || [];
          setLikeCount(likedBy.length);
          setIsLiked(likedBy.includes(user.id));
        }
      } catch (err) {
        console.error("Error fetching like data:", err.message);
        setUserMessage("Error fetching like status.");
        setTimeout(() => setUserMessage(""), 3000);
      }
    };

    fetchLikeStatus();
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
        setIsLiked(false);
      } else {
        await likeTrip(user, id);
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Error toggling like:", err.message);
      setUserMessage("Failed to toggle like. Try again.");
      setTimeout(() => setUserMessage(""), 3000);
    }
  };

  return (
    <>
      <button onClick={toggleLike}>
        {isLiked ? (
          <LikeHeart className="h-6 w-6 text-red-900" />
        ) : (
          <UnlikeHeart className="h-6 w-6 text-red-900" />
        )}
      </button>
      <p className="text-gray-600 text-sm">{likeCount}</p>
      {userMessage && <p className="text-red-800 text-base">{userMessage}</p>}
    </>
  );
};

export default LikeButton;
