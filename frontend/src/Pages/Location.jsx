import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import "./UpdateLocation.css";
import { useNavigate } from 'react-router-dom';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.5937, // Default center (India)
  lng: 78.9629,
};

const UpdateLocation = () => {
  const [location, setLocation] = useState({
    addres1: "",
    addres2: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC0G0mfLBuz5XfdCYCEN6j-AGlSpwts79Q", // Replace with your Google Maps API key
  });

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Location Updated:\n${JSON.stringify(location, null, 2)}`);
  };

  const onMapClick = useCallback(async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const address1 = data.results[0].formatted_address;
        let city = "";
        let state = "";
        let country = "";
        let pincode = "";

        addressComponents.forEach(component => {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            pincode = component.long_name;
          }
        });

        setLocation({
          addres1: address1,
          addres2: "",
          city: city,
          pincode: pincode,
          state: state,
          country: country,
        });
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  }, []);

  return (
    <div className="location-form-container">
      <h2>Update Delivery Location</h2>
      <form onSubmit={handleSubmit} className="location-form">
        <div className="form-container">
          <div className="form-group">
            <label>Address1</label>
            <input type="text" name="addres1" value={location.addres1} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address2</label>
            <input type="text" name="addres2" value={location.addres2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={location.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input type="text" name="pincode" value={location.pincode} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" value={location.state} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="country" value={location.country} onChange={handleChange} />
          </div>
        </div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={center}
            onClick={onMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        )}
        <button type="submit" className="submit-btn">Update Location</button>
      </form>
    </div>
  );
};

export default UpdateLocation;