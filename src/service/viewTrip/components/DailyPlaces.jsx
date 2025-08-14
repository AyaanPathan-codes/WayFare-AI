import React from 'react'
import PlaceCardItem from './PlaceCardItem';

const DailyPlaces = ({ trip }) => {
  // Find the dynamic key inside tripData (e.g., "pune_travel_plan")
  const planKey = trip?.tripData ? Object.keys(trip.tripData)[0] : null;
  const itinerary = planKey ? trip.tripData[planKey]?.itinerary : null;

  if (!itinerary || itinerary.length === 0) {
    return <div>No itinerary found</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg mt-4">Places To Visit</h2>

      {itinerary.map((item, index) => (
        <div key={index} className="mt-5">
          {/* Day Title (outside grid) */}
          <h2 className="font-medium text-lg mb-3">Day {item.day}</h2>

          {/* Grid for places */}
          <div className="grid md:grid-cols-2 gap-5">
            {item.plan?.map((place, idx) => (
              <div key={idx} className="p-1  rounded-lg border space-y-2 hover:scale-105 transition-all hover:shadow-md  ">
                <PlaceCardItem place={place} />
                <p className="font-medium text-sm text-gray-500">
                  🕒 Best Time to Visit: {place.best_time_to_visit}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyPlaces;
