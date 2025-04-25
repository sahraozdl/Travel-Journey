// src/components/LocationSearch.jsx
import React, { useRef, useEffect } from "react";
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

      const autocomplete = new window.google.maps.places.Autocomplete(containerRef.current);

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
    <div>
      <input
        ref={containerRef}
        type="text"
        placeholder="Search for a location"
        className="p-2 border rounded"
      />
    </div>
  );
};

export default LocationSearch;
