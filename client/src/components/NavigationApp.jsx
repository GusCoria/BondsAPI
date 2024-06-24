import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axiosInstance from "../services/axiosInstance";

export function NavigationApp({ onSelectCurrency }) {
  const [selectedCoin, setSelectedCoin] = useState("MXN");
  const navigate = useNavigate();

  const handleSelect = (eventKey) => {
    setSelectedCoin(eventKey);
    onSelectCurrency(eventKey); // Llama a la función de selección de moneda del padre
  };

  const handleLogout = async () => {
    try {
        await axiosInstance.post('/bonds/logout/');
        localStorage.removeItem('username');
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/signin');
    }
  };

  return (
    <nav className="bg-zinc-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">BondsApp</h1>

        <div className="flex items-center space-x-4">
          <div>
            <button
              type="button"
              className="rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs uppercase font-medium shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div>
            <DropdownButton
              id="Actions"
              title="Actions"
              variant="info"
            >
              <Dropdown.Item href="/my">My Bonds</Dropdown.Item>
              <Dropdown.Item href="/buy">Buy Bonds</Dropdown.Item>
            </DropdownButton>
          </div>

          <div>
            <DropdownButton
              id="coin"
              title={selectedCoin}
              variant="info"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="MXN">MXN</Dropdown.Item>
              <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
