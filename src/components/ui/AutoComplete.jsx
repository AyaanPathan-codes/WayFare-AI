import React, { useState } from "react";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const PlaceAutocomplete = ({ onSelect }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete?input=${value}&key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.id",
        },
        body: JSON.stringify({
          input: value,
          languageCode: "en",
        }),
      }
    );

    const data = await response.json();
    setSuggestions(data.places || []);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter your destination"
        className="w-full border px-4 py-2 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-60 overflow-y-auto rounded shadow-md">
          {suggestions.map((place, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setInput(place.displayName.text);
                setSuggestions([]);
                onSelect(place);
              }}
            >
              {place.displayName.text} – {place.formattedAddress}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocomplete;
