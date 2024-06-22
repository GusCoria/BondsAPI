
import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {getMyBonds} from '../api/MyBonds.api'

  export function MybondsList() {
    {/*useEffect (()=>{
        function loadMy(){
            const res = getMyBonds()
        }
        loadMy()
    }, [])*/}

  return (
    <section className="h-screen">
      <div className="max-w-screen p-4 flex  items-center justify-between">
        <h1 className="text-4xl font-bold  ">My Bonds</h1>

        <Link to="/create" className="block  ">
          <button
            type="button"
            className="  rounded text-black  bg-cyan-400 px-6 pb-2 pt-2.5 
            text-xs uppercase font-medium shadow-md "
          >
            Create Bond
          </button>
        </Link>
      </div>
      <div className="flex-grow">tabla</div>

      <div className="flex justify-center">
        <h2 className="mt-14 text-white ">BondsApp 2024</h2>
      </div>
    </section>
  )
}

