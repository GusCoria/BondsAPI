import React, { useState } from "react";
import { Link } from "react-router-dom";

// funcion de barra de navegacion del signin y signup
export function Navigation({ }) {
  return (
    <nav className="bg-zinc-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">BondsApp</h1>

        <div className="flex items-center space-x-4">
          <div>
            <Link to="/signin">
              <button
                type="button"
                className="rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs uppercase font-medium shadow-md"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
