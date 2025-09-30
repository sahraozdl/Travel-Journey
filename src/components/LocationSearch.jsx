import React, { useEffect, useRef } from "react";
import { useLoadGoogleMaps } from "./useLoadGoogleMaps";

const LocationSearch = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);

  useLoadGoogleMaps();

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps library not yet available.");
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (onPlaceSelected && place.place_id) {
          const mapUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
          onPlaceSelected(mapUrl);
        }
      });
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
    <div className="w-full relative z-50">
  <input
    ref={inputRef}
    type="text"
    placeholder="Search for a location"
    className="input w-full border rounded p-2"
    autoComplete="on"
  />
</div>

  );
};

export default LocationSearch;
