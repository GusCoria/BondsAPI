import React from "react";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

export function CreateBonds() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="items-center justify-center">
        {/* titlo */}
        <h1 className="text-4xl font-bold mb-6 text-center">Create Bond</h1>
        <form className="space-y-6">
          {/* imput nombre */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-white mb-2">
              Name
            </label>
            <TEInput
              id="name"
              type="text"
              size="lg"
              className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* imput numero */}
          <div className="mb-6">
            <label htmlFor="number" className="block text-white mb-2">
              Number
            </label>
            <TEInput
              id="number"
              type="number"
              label="A numeric value in the range of 1 to 10,000."
              size="lg"
              className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* imput contraseña*/}
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">
              Price
            </label>
            <TEInput
              id="number"
              type="number"
              label="A numeric value in the range of 0 to 10,000,000."
              size="lg"
              className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* boton registrar */}

          <Link to="/my" className="block w-full">
            <button
              type="button"
              className="block w-full  text-black rounded bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
            >
              Submit
            </button>
          </Link>
        </form>
        <div className="flex justify-center">
          <h2 className="mt-14 text-white ">BondsApp 2024</h2>
        </div>
      </div>
    </section>
  );
}
