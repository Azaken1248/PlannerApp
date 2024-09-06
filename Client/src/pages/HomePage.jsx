import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/HomePage.css";

const HomePage = () => {
  const [location, setLocation] = useState("VIT Chennai");
  const [map, setMap] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [places, setPlaces] = useState([]); // State to store search results
  const mapRef = useRef(null); // Ref to track the map div

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    // Geocode the location using OpenStreetMap Nominatim
    const encodedLocation = encodeURIComponent(location);
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          if (map) {
            map.setView([lat, lon], 13); // Update map view
          }
        }
      });
  };

  const handleButtonClick = (type) => {
    if (!map) return;

    // Get the current bounds of the map
    const bounds = map.getBounds();
    const { _southWest, _northEast } = bounds;
    const bbox = `${_southWest.lat},${_southWest.lng},${_northEast.lat},${_northEast.lng}`;

    // Define search queries for restaurants and tourism
    let query = "";
    if (type === "Restaurant") {
      query = "restaurants";
    } else if (type === "Tourism") {
      query = "famous places";
    }

    // Search nearby places using OpenStreetMap Nominatim with bounding box
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&bbox=${bbox}&format=json&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPlaces(data); // Update the places state with search results
          // Optionally clear existing markers from the map
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });
          // Add new markers for search results
          data.forEach((item) => {
            const { lat, lon, display_name } = item;
            L.marker([lat, lon])
              .addTo(map)
              .bindPopup(display_name)
              .openPopup();
          });
        }
      });
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback: ${feedback}`);
    setFeedback("");
  };

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized yet
    if (!mapRef.current) {
      const initialMap = L.map("map").setView([12.8372, 80.1535], 13); // Default location: VIT Chennai
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(initialMap);
      setMap(initialMap);
      mapRef.current = initialMap; // Store the initialized map in the ref
    }
  }, [map]);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Turismo</h1>

      <div className="location-search">
        <form onSubmit={handleLocationSubmit}>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter a location"
            className="location-input"
          />
          <button type="submit" className="location-button">
            Search
          </button>
        </form>
      </div>

      <div className="button-container">
        <button className="home-button" onClick={() => handleButtonClick("Restaurant")}>Restaurant</button>
        <button className="home-button" onClick={() => handleButtonClick("Tourism")}>Tourism</button>
      </div>

      <div className="map-container">
        <div id="map" style={{ height: "350px", width: "100%" }}></div>
      </div>

      <div className="places-container">
        <h2>Results:</h2>
        <ul className="places-list">
          {places.map((place, index) => (
            <li key={index} className="place-item">
              {place.display_name}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback-container">
        <h2>We value your feedback!</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback here"
            className="feedback-input"
          />
          <button type="submit" className="feedback-button">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
