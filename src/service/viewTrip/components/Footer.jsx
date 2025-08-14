import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 w-full">
      <div className="px-5 flex flex-col md:flex-row justify-between items-center w-full">
        {/* Left Side */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">WayFare-AI</h2>
          <p className="text-sm text-gray-400">Making your journeys smarter & easier.</p>
        </div>

        {/* Right Side */}
        <div className="text-sm text-gray-400 mt-4 md:mt-0">
          © {new Date().getFullYear()} WayFare-AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
