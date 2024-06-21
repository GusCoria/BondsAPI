import React from "react";
import { Link } from "react-router-dom";
import { TEInput } from "tw-elements-react";

export function SignIn() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
        <form>
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-white mb-2">
              Email address
            </label>
            <TEInput
              type="email"
              size="lg"
              className="text-white w-full px-3 py-2 border-gray-300 "
            />
          </div>

          {/* <!--Password input--> */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">
              Password
            </label>
            <TEInput
              type="password"
              size="lg"
              className="text-white w-full px-3 py-2 bg-white "
            />
          </div>

          {/* <!-- Login button --> */}

          <Link to="/my" className="block w-full">
            <button
              type="button"
              className="block w-full  rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs uppercase font-medium  "
            >
              Sign In
            </button>
          </Link>

          {/* <!-- Register link --> */}
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
