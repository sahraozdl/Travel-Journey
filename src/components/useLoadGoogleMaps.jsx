import { useEffect } from "react";

export function useLoadGoogleMaps() {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error(" Google Maps API key is missing. Check your .env.local");
      return;
    }

    if (!document.getElementById("google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);
}
