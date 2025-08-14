import React from 'react';


function Header() {
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <img onClick={()=>{}}
          className='h-10 w-auto sm:h-12 ml-2'
          src='/logo.png'
          alt='Logo'
        />
    
        {/* Sign In Button */}
       <button className='px-3 py-1 md:px-4 md:py-1.5 lg:px-3 lg:py-1 text-sm md:text-base font-semibold bg-black text-white rounded-md mr-6 mt-4'>
  Sign In
</button>

      </div>
    </div>
  );
}

export default Header;
