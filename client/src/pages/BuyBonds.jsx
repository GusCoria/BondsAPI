// src/components/Login.js
import React from 'react';
import { Link } from 'react-router-dom';

export function BuyBonds() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex justify-end">
            <Link to="/dashboard">
              <button
                type="button"
                className="px-6 py-2 rounded bg-teal-500 text-white uppercase font-medium hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
              >
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
