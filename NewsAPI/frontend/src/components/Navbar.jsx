import React from 'react'
import { FaSearch } from "react-icons/fa";

function Navbar(){
  return (
    <div className='flex items-center justify-between px-4 py-4 md:px-8 border-7 border-black border-double mt-1'>
        <div>
          <FaSearch className='text-xl md:text-2xl cursor-pointer hover:text-gray-600 transition-colors'/>
        </div>
        
      <div className='flex justify-center flex-1'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black  font-[PlayfairDisplay] text-center'>
          Akbaar
        </h1>
      </div>

      <div className='w-6 md:w-8'></div>
    </div>
  )
}

export default Navbar