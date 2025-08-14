import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc,getDoc } from "firebase/firestore";
import db from "@/service/FirebaseConfig"
import InformationSection from './components/InformationSection';
import Hotels  from './components/Hotels';
import DailyPlaces from './components/DailyPlaces';
import {MutatingDots} from 'react-loader-spinner';
import Footer from './components/Footer';


const ViewTrip = () => {
    const {tripId} = useParams();
  const [trip,setTrip]= useState(null)

    useEffect(()=>{
        tripId && GetTripData()
    },[tripId])

    /* Use To Get Trip Information From Firebase* */
    const GetTripData = async()=>{
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef)
        
        if(docSnap.exists()){
            console.log("Document",docSnap.data());
            setTrip(docSnap.data())
        }
        else{
            console.log("No such documents");
            toast("No Trip Found")
        }
    }
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    {!trip?.userSelection ? (
      <div>(<MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />)</div>
    ) : (
      <>
        <InformationSection trip={trip} />
        <Hotels trip={trip} />
        <DailyPlaces trip={trip} />
        
      </>
    )}
    <Footer className='w-full'/>
  </div>
  );
}

export default ViewTrip