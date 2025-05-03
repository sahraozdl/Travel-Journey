import { useAuth } from "../../hooks/useAuth";
import SaveButton from "./SaveButton";
import LikeButton from "./LikeButton";
import { MapPinIcon } from "@heroicons/react/20/solid";

export default function TripCard({ entry }) {
  const user = useAuth();

  return (
    <article className="flex flex-row justify-stretch p-4">
      <div className="main-image-container">
        <img
          className="main-image"
          src={typeof entry.img === "string" ? entry.img : entry.img?.src || ""}
          alt={entry.img?.alt || "Trip image"}
        />
      </div>

      <div className="info-container w-full">
      <span className="uppercase text-gray-700 text-xs mr-3 flex flex-row items-center gap-1">
        {entry.country}
        <MapPinIcon className="h-4 w-4 text-red-900" />
        <a
          className="lowercase underline text-gray-400 visited:text-gray-600 px-4"
          href={entry.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/*have to style lowercase find how to style find later*/}
          View on Google Maps
        </a></span>
        <span className="flex flex-row items-center gap-6 py-2 justify-between">
        <h2 className="font-bold text-lg">{entry.title}</h2>
        <p className="font-light text-xs px-4">{entry.dates}</p>
        </span>
        <p className="py-4 leading-6">{entry.text}</p>

        <div className="flex flex-row-reverse">
  <SaveButton user={user} id={entry.id} />
  <LikeButton user={user} id={entry.id} />
</div>

      </div>
    </article>
  );
}