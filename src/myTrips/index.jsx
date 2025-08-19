import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import db from "@/service/FirebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigate();
  const [userTrip, setUserTrip] = useState([]); // <-- use array

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }

    setUserTrip([]); // reset before fetching

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    const tripsArray = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      tripsArray.push({ id: doc.id, ...doc.data() }); // include doc.id
    });

    setUserTrip(tripsArray);
  };

  return (
   <div className="sm:px-20 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
  <h2 className="font-bold text-2xl">My Trips</h2>

  <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
    {userTrip.length > 0 ? (
      userTrip.map((trip, index) => (
        <UserTripCardItem key={index} trip={trip} />
      ))
    ) : (
      [1, 2, 3, 4, 5, 6].map((item, index) => (
        <div
          key={index}
          className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
        ></div>
      ))
    )}
  </div>
</div>

  );
}

export default MyTrips;
