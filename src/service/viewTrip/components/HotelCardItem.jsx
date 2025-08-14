import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails} from '@/service/GlobalApi';
import {MutatingDots} from 'react-loader-spinner';


const HotelCardItem = ({ hotel }) => {
    const [photoUrl, usePhotoUrl] = useState()
    useEffect(() => {
      // Only call if trip and location label exist
      hotel&&GetPlacePhoto();
      
    }, [hotel]);
    
    const GetPlacePhoto = async () => {
      try {
        const HotelQuery = hotel.name;
        console.log('Searching for:', HotelQuery);
    
        if (!HotelQuery) {
          console.error('No location query provided');
          return;
        }
    
        // This is the key change: create the JSON object with the 'textQuery' field
        const requestBody = {
          textQuery: hotel.name
        };
        
        // Pass the correctly formatted object to your API function
        const result = await GetPlaceDetails(requestBody);
    
        console.log('API Response:', result);
        console.log(result.data.places[0].photos[1].name)
    
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[2].name);
        usePhotoUrl(PhotoUrl)
    
      } catch (error) {
        console.error('Error in GetPlacePhoto:', error);
      }
    };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.name}`}
      target="_blank"
    >
      <div className="mb-4 hover:scale-105 transition-all cursor-pointer">
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={photoUrl?photoUrl:<div>(<MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />)</div>}
            alt={hotel.name}
          />
        </div>
        <div>
          <h3 className="font-medium">{hotel.name}</h3>
          <h2 className="text-xs text-gray-500">📍 {hotel.location}</h2>
          <h2 className="text-sm text-black font-medium">{hotel.hotel_price}</h2>
          <h2>⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
