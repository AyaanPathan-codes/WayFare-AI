import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-cards";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <>
    <div className="flex justify-center items-center mx-4 sm:mx-56 gap-9">
  <h1
    className="text-[20px] sm:text-[40px] text-center font-extrabold whitespace-nowrap overflow-hidden border-r-4 border-black"
    style={{
      width: '0ch',
      animation:
        'typing 4s steps(36) forwards, blink 0.75s step-end infinite',
      animationIterationCount: 'infinite',
    }}
  >
    Tired of Planning? Let Us Do It for You
    <style>{`
      @keyframes typing {
        0% { width: 0ch; }
        99.9% { width: 36ch; }
        100% { width: 36ch; }
      }
      @keyframes blink {
        0%, 100% { border-color: black; }
        50% { border-color: transparent; }
      }
    `}</style>
  </h1>
</div>

    



      <p className="text-[20px] sm:text-[40px] mx-auto text-black p-10 mt-2 max-w-3xl">
        <span className="font-bold bg-amber-300"> Skip the stress,</span> let AI handle your
        itinerary! From cozy cafés to epic adventures.
        <br />
        <span className="font-bold bg-amber-300">Your Perfect Trip Starts Here.</span>
      </p>

      <div className="flex justify-center">
        <Link to={"/create-trip"}>
         
          <button className="bg-black text-white px-6 py-2 rounded hover:scale-105 transition-transform duration-300">
            Design Your Journey
          </button>
        </Link>
      </div>

      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        cardsEffect={{
          perSlideOffset: 10, // default is 8 (pixels)
          perSlideRotate: 3, // default is 2 (degrees)
          rotate: true, // set to false if you want flat stack
          slideShadows: true, // shadow under each card
        }}
        className="mySwiper max-w-xs sm:max-w-md mt-7"
      >
        <SwiperSlide>
          <div className="p-6 bg-white rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold">Taj Mahal</h2>
            <img
              src="https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Taj Mahal"
            />
            <p>India</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6 bg-white rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold">Burj Khalifa</h2>
            <img
              src="https://plus.unsplash.com/premium_photo-1694475634077-e6e4b623b574?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Burj Khalifa"
            />
            <p>Dubai</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6 bg-white rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold">Northern Lights</h2>
            <img
              src="https://plus.unsplash.com/premium_photo-1675756583711-ce312872227b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Northern Lights"
            />
            <p>Norway</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="p-6 bg-white rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold">Ladakh</h2>
            <img
              src="https://plus.unsplash.com/premium_photo-1661962344178-19930ba15492?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Ladakh"
            />
            <p>India</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="p-6 bg-white rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold">Kyoto</h2>
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Kyoto"
            />
            <p>Japan</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="p-6 bg-white rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-bold">Santorini</h2>
            <img
              src="https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Santorini"
            />
            <p>Greece</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <footer className="bg-black my-10 text-white py-10 px-6 sm:px-20 ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-3">Warfare AI</h2>
            <p className="text-sm">
              AI-crafted travel plans tailored just for you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <p>Email: support@warfareai.com</p>
            <p>Phone: +91 9876543210</p>
            <div className="flex space-x-3 mt-2">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10 ">
          © {new Date().getFullYear()} Warfare AI. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Hero;
