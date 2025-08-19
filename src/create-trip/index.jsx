import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import db from "@/service/FirebaseConfig"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/Option";

import {
  Dialog,
  DialogContent,
  DialogDescription,

} from "@/components/ui/dialog";


function CreateTrip() {
  const [place, setPlace] = useState({});
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleInputChange = (name, value) => {
    if (name === "noOfDays") {
      const numberOfDays = Number(value);
      if (numberOfDays > 5) {
        toast("Trip cannot be more than 5 days.");
        return;
      }
      setFormData({
        ...formData,
        [name]: numberOfDays,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse), getUserProfile(tokenResponse);
    },
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const { location, budget, traveller, noOfDays } = formData;

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Check if all fields are filled
    if (!location || !budget || !traveller || !noOfDays) {
      toast("Please fill all details.");
      return;
    }
    else{
      toast("Generating trip please wait!")
    }

    // Check if noOfDays is a valid number
    const numberOfDays = Number(noOfDays);
    if (isNaN(numberOfDays) || numberOfDays <= 0) {
      toast("Number of days must be more than 0.");
      return;
    }

    // Check if noOfDays is more than 5
    if (numberOfDays > 5) {
      toast("Trip cannot be more than 5 days.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());

    setLoading(false);
    saveAITrip(result?.response?.text());
  };

  const saveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        console.log(resp.headers);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="sm:px-20 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-2xl lg:text-3xl">
          Tell us your Travel preferences 🚞🌴
        </h2>

        <p className="mt-2 text-gray-500 text-xl">
          {" "}
          Just provide some basic details & your trip will be generated{" "}
        </p>

        <div className="mt-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What's your Destination ?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium mt-10">
            How Many Days You Are Planning For ?
          </h2>
          <Input
            placeholder={"Ex. 3 Days"}
            type="Number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium mt-10">
            What's your Budget?
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-2 sm:p-4 border rounded-lg hover:shadow-lg cursor-pointer text-center ${
                  formData?.budget === item.title
                    ? "shadow-lg border-black"
                    : ""
                }`}
              >
                <h2 className="text-xl sm:text-3xl mb-1 sm:mb-2">
                  {item.icon}
                </h2>
                <h2 className="font-semibold text-sm sm:text-lg">
                  {item.title}
                </h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium mt-10">
            Who Are You Travelling With ?
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-2 sm:p-4 border rounded-lg hover:shadow-lg cursor-pointer text-center ${
                  formData?.traveller === item.people
                    ? "shadow-lg border-black"
                    : ""
                }`}
              >
                <h2 className="text-xl sm:text-3xl mb-1 sm:mb-2">
                  {item.icon}
                </h2>
                <h2 className="font-semibold text-sm sm:text-lg">
                  {item.title}
                </h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button
            disabled={loading}
            onClick={() => {
              onGenerateTrip();
            }}
          >
            {" "}
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7  animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogDescription>
              <img src="logo.png" alt="" />
              <h2 className="font-bold mt-6 text-xl text-black">
                Sign In With Google
              </h2>
              <h3>Sign In With Google To App Securly</h3>
              <Button onClick={login} className="w-full mt-5">
                <FaGoogle />
                SIGN IN WITH GOOGLE
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default CreateTrip;
