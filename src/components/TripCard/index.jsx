// src/components/TripCard/index.jsx
import { useAuth } from "../../hooks/useAuth";
import SaveButton from "./SaveButton";
import LikeButton from "./LikeButton";

export default function TripCard({ entry }) {
  const user = useAuth();

  return (
    <article className="journal-entry">
      <div className="main-image-container">
        <img
          className="main-image"
          src={typeof entry.img === "string" ? entry.img : entry.img?.src || ""}
          alt={entry.img?.alt || "Trip image"}
        />
      </div>

      <div className="info-container">
        <img className="marker" src="../images/marker.png" alt="map marker icon" />
        <span className="country">{entry.country}</span>
        <a href={entry.googleMapsLink} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
        <h2 className="entry-title">{entry.title}</h2>
        <p className="trip-dates">{entry.dates}</p>
        <p className="entry-text">{entry.text}</p>
      </div>

      <div className="button-row">
        <SaveButton user={user} tripId={entry.id} />
        <LikeButton user={user} tripId={entry.id} />
      </div>

      <p>{entry.savedBy?.length || 0} saved • {entry.likedBy?.length || 0} liked</p>
    </article>
  );
}
