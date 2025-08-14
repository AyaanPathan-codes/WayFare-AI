import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails} from '@/service/GlobalApi';

const PlaceCardItem = ({ place }) => {

   const [photoUrl, usePhotoUrl] = useState()
  useEffect(() => {
    // Only call if trip and location label exist
   
      place&&GetPlacePhoto();
     }, [place]);
  
  const GetPlacePhoto = async () => {
    try {
      const placeQuery = place.place_name;
      console.log('Searching for:', placeQuery);
  
      if (!placeQuery) {
        console.error('No location query provided');
        return;
      }
  
      // This is the key change: create the JSON object with the 'textQuery' field
      const requestBody = {
        textQuery: placeQuery
      };
      
      // Pass the correctly formatted object to your API function
      const result = await GetPlaceDetails(requestBody);
  
      console.log('API Response:', result);
      console.log(result.data.places[0].photos[1].name)
  
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[1].name);
      usePhotoUrl(PhotoUrl)
  
    } catch (error) {
      console.error('Error in GetPlacePhoto:', error);
    }
  };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.place_name} target='_blank'>
    <div className="rounded-xl p-5 sm:p-7 space-y-3 w-full max-w-[500px] mx-auto   ">
      <div className="flex gap-5">
        <img
          className="w-[130px] h-[130px] rounded-xl object-cover"
          src={photoUrl?photoUrl:"/placeHolder.webp"}
          alt={place.place_name}
        />
        <h3 className="font-bold text-lg">{place.place_name}</h3>
      </div>

      <div className="mt-3">
        <p className="text-sm  mt-6 font-medium mb-3">{place.place_details}</p>
        <p className="text-sm mt-6 font-normal">🎟️ {place.price_details}</p>
       <Button className='mt-6'> <FaMapLocationDot />   </Button>  
   </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
