import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function Header() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [avatarBroken, setAvatarBroken] = useState(false);

  useEffect(() => {
    // If user was updated elsewhere, sync once on mount
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      } catch {}
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);             
        setAvatarBroken(false);          
        setOpenDialog(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    setAvatarBroken(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img
          className="h-10 w-auto sm:h-12 ml-2 cursor-pointer"
          src="/logo.png"
          alt="Logo"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/120x40?text=Logo";
          }}
        />

        {user ? (
          <div className="flex justify-center items-center gap-3">
             <a href="/create-trip"><Button variant="outline" className="rounded-full">
             Create Trip
            </Button></a>
            <a href="/my-trips"><Button variant="outline" className="rounded-full">
              My Trips
            </Button></a>
            

            <Popover>
              <PopoverTrigger>
                {user.picture && !avatarBroken ? (
                  <img
                    className="h-[40px] w-[40px] rounded-full object-cover border"
                    src={user.picture}
                    alt={user.name || "Profile"}
                    onError={() => setAvatarBroken(true)}
                  />
                ) : (
                  <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold border">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex items-center gap-3 pb-2 border-b">
                  {user.picture && !avatarBroken ? (
                    <img
                      className="h-10 w-10 rounded-full object-cover border"
                      src={user.picture}
                      alt={user.name || "Profile"}
                      onError={() => setAvatarBroken(true)}
                    />
                  ) : (
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold border">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-medium truncate">{user?.name || "User"}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {user?.email || ""}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-2" onClick={handleLogout}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button
            onClick={() => setOpenDialog(true)}
            className="px-3 py-1 md:px-4 md:py-1.5 lg:px-3 lg:py-1 text-sm md:text-base font-semibold bg-black text-white rounded-md mr-6 mt-4"
          >
            Sign In
          </button>
        )}

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
    </div>
  );
}

export default Header;
