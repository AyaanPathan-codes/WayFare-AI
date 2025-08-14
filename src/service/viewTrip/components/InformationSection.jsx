import React, { useEffect, useState} from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
import {MutatingDots} from 'react-loader-spinner';



const InformationSection = ({trip}) => {

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
    <div>
      <img className="h-[350px] w-full 
       object-cover rounded-md"src={photoUrl} alt=<div>(<MutatingDots
                     visible={true}
                     height="100"
                     width="100"
                     color="#4fa94d"
                     secondaryColor="#4fa94d"
                     radius="12.5"
                     ariaLabel="mutating-dots-loading"
                     wrapperStyle={{}}
                     wrapperClass=""
                     />)</div> />


   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-5 gap-4 sm:gap-0">
  {/* Left Section */}
  <div className="flex flex-col gap-2">
    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
    <div className="flex flex-wrap gap-2">
      <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-sm md:text-md">
        📅 {trip.userSelection?.noOfDays} Day
      </h2>
      <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-sm md:text-md">
        💰 {trip.userSelection?.budget} Budget
      </h2>
      <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-sm md:text-md">
        🥂 {trip.userSelection?.traveller} Traveller
      </h2>
    </div>
  </div>

  {/* Right Section */}
  <div className="flex justify-start sm:justify-end">
    <Button className="w-full sm:w-auto">
      <IoIosSend size={20} />
    </Button>
  </div>
</div>


    </div>
  )
}

export default InformationSection