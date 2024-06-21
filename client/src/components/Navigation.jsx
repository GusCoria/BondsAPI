// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { TESelect } from "tw-elements-react";

export function Navigation() {
  const data = [
    { text: "MXN", value: 1 },
    { text: "USD", value: 2 },
  ];

  return (
    <nav className="bg-zinc-800 p-4">
      <div className="container mx-auto flex justify-between items-center ">
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
          
          <div>
          <DropdownButton
            id="Actions"
            title="Actions"
            variant="info"
          >
            <Dropdown.Item href="/my">My Bonds</Dropdown.Item>
            <Dropdown.Item href="/by">Buy Bonds</Dropdown.Item>
          </DropdownButton>
          </div>

          <div>
          <DropdownButton
            id="coin"
            title="Coin"
            variant="info"
          >
            <Dropdown.Item href="">MXN</Dropdown.Item>
            <Dropdown.Item href="">USD</Dropdown.Item>
          </DropdownButton>
          </div>
          
        </div>
      </div>
    </nav>
  );
}