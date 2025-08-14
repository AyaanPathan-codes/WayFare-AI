import HotelCardItem from "./HotelCardItem";

const Hotels = ({ trip }) => {
  const planKey = trip?.tripData ? Object.keys(trip.tripData)[0] : null;
  const hotels = planKey ? trip.tripData[planKey]?.hotels: null;

  if (!hotels || hotels.length === 0) {
    return <div>No hotels found</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold sm:text-3xl mt-2 mb-6">
        Hotel Recommendation
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotels.map((item, index) => (
          <HotelCardItem key={index} hotel={item} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
