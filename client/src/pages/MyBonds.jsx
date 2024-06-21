import React from "react";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

export function MyBonds() {
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
      
    </section>
  );
}
