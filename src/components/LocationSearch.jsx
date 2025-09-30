import React, { useEffect, useRef } from "react";
import { useLoadGoogleMaps } from "./useLoadGoogleMaps";

const LocationSearch = ({ onPlaceSelected }) => {
  const containerRef = useRef(null);

  useLoadGoogleMaps();

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps library not yet available.");
        return;
      }

      const autocompleteEl = document.createElement("google-places-autocomplete");

      autocompleteEl.addEventListener("place_changed", () => {
        const place = autocompleteEl.getPlace();
        if (onPlaceSelected && place.place_id) {
          const mapUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
          onPlaceSelected(mapUrl);
        }
      });

      containerRef.current.appendChild(autocompleteEl);
    };

    const interval = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(interval);
        initAutocomplete();
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onPlaceSelected]);

  return (
  <input
    ref={inputRef}
    type="text"
    placeholder="Search for a location"
    className="input w-full"
  />
);
};

export default LocationSearch;
