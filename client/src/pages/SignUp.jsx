import React from "react";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

export function SignUp() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md  ">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
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

              {/* imput correo */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">
                  Email address
                </label>
                <TEInput
                  id="email"
                  type="email"
                  size="lg"
                  className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              {/* imput contraseña*/}
              <div className="mb-6">
                <label htmlFor="password" className="block text-white mb-2">
                  Password
                </label>
                <TEInput
                  id="password"
                  type="password"
                  size="lg"
                  className="text-white w-full px-3 py-2 border "
                />
              </div>

              {/* imput confirmar contraseñas */}
              <div className="mb-6">
                <label
                  htmlFor="confirm-password"
                  className="block text-white mb-2"
                >
                  Confirm Password
                </label>
                <TEInput
                  id="confirm-password"
                  type="password"
                  size="lg"
                  className="text-white w-full px-3 py-2 border"
                />
              </div>
              {/* boton registrar */}

              <Link to="/signin" className="block w-full">
                <button
                  type="button"
                  className="block w-full rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
                >
                  Register
                </button>
              </Link>
            </form>
          </div>
    </section>
  );
}
