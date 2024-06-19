import React from 'react'

function Navbar() {
  return (
    <nav className='bg-slate-800'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className='logo font-bold text-white text-2xl'>
          <span className='text-orange-700'>&lt;</span>
          Pas
          <span className='text-orange-700'>00/&gt;</span> 
        </div>
        <ul>
          <li className='flex gap-4 text-white'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact us</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar