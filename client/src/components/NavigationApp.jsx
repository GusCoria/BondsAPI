import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axiosInstance from "../services/axiosInstance";

//barra de navegacion en la app que tendra el logout, intercambio de pestañas y cambio de moneda

export function NavigationApp({ onSelectCurrency }) {
  const [selectedCoin, setSelectedCoin] = useState("MXN");
  const navigate = useNavigate();

  const handleSelect = (eventKey) => {
    setSelectedCoin(eventKey);
    onSelectCurrency(eventKey); // Llama a la función de selección de moneda del padre
  };
  // funcion del boton logout para terminar sesion y eliminar el username del usuario que ingreso
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
        {/*boton logout */}
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
          {/* boton desplegable paginas my bonds y buy bonds*/}
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
          {/* boton desplegable para cambiar de mone no me quedo :(*/}
          <div>
            <DropdownButton
              id="coin"
              title={selectedCoin}
              variant="info"
            >
              <Dropdown.Item >MXN</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
