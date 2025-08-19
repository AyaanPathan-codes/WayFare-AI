import React from 'react'
import { useState,useEffect } from 'react';
import { GetPlaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {
      
        const [photoUrl, usePhotoUrl] = useState()
        
        useEffect(() => {
          // Only call if trip and location label exist
          if (trip?.userSelection?.location?.label) {
            GetPlacePhoto();
          }
        }, [trip]);
        
        const GetPlacePhoto = async () => {
          try {
            const locationQuery = trip?.userSelection?.location?.label;
            console.log('Searching for:', locationQuery);
        
            if (!locationQuery) {
              console.error('No location query provided');
              return;
            }
        
            // This is the key change: create the JSON object with the 'textQuery' field
            const requestBody = {
              textQuery: locationQuery
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all hover-shadow'>


    <img className="object-cover rounded-xl h-[220px] w-full" src={photoUrl?photoUrl : "placeHolder.webp"} alt="" />
        <div>
            <h2 className='font-bold text-lg text-center'>{trip?.userSelection?.location.label}</h2>
            <h2 className='text-sm text-gray-500 text-center'>{trip?.userSelection.noOfDays} Days Trip With {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem