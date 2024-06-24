import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { TEInput } from "tw-elements-react";
import { NavigationApp } from "../components/NavigationApp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// función para crear un bono
export function CreateBonds() {
  const [name, setName] = useState("");
  const [numer, setNumber] = useState(""); // Corregir el nombre del estado
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // función para obtener el ID del usuario basado en el nombre de usuario almacenado localmente
  useEffect(() => {
    async function fetchUserId() {
      const username = localStorage.getItem("username");
      try {
        const userResponse = await axiosInstance.get(
          `/bonds/users/?username=${username}`
        );
        const user = userResponse.data[0];
        if (user) {
          setUserId(user.id);
        } else {
          console.error("User not found for username:", username);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUserId();
  }, []);

  // función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!validateName() || !validateNumber() || !validatePrice()) {
      return; // Salir si alguna validación no pasa
    }

    const bondData = {
      name,
      numer: parseInt(numer),
      price: parseFloat(price).toFixed(4).toString(),
      seller: userId,
      buyer: null,
    };

    try {
      // Validación para asegurar que userId no sea null
      if (userId) {
        await axiosInstance.post("/bonds/bonds/", bondData);
        toast.success("Bond successfully created!");
        navigate("/my");
      } else {
        toast.error("Seller ID not available. Bond creation aborted.");
      }
    } catch (error) {
      toast.error("Error creating bond.");
    }
  };

  // Validación del campo 'name'
  const validateName = () => {
    if (name.length < 3 || name.length > 50) {
      toast.error("Name must be between 3 and 50 characters.");
      return false;
    }
    return true;
  };

  // Validación del campo 'numer'
  const validateNumber = () => {
    const numberValue = parseInt(numer);
    if (isNaN(numberValue) || numberValue < 1 || numberValue > 10000) {
      toast.error("Number must be a numeric value between 1 and 10000.");
      return false;
    }
    return true;
  };

  // Validación del campo 'price'
  const validatePrice = () => {
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0 || priceValue > 100000000.0000) {
      toast.error("Price must be a numeric value between 0 and 100,000,000.0000.");
      return false;
    }
    return true;
  };

  return (
    <div>
      <NavigationApp />
      <section className="h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center">Create Bond</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Input 'name' */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-white mb-2">
                Name
              </label>
              <TEInput
                id="name"
                type="text"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Input 'numer' */}
            <div className="mb-6">
              <label htmlFor="number" className="block text-white mb-2">
                Number
              </label>
              <TEInput
                id="number"
                type="number"
                value={numer}
                onChange={(e) => setNumber(e.target.value)}
                label="A numeric value in the range of 1 to 10,000."
                size="lg"
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Input 'price' */}
            <div className="mb-6">
              <label htmlFor="price" className="block text-white mb-2">
                Price
              </label>
              <TEInput
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                label="A numeric value in the range of 0 to 100,000,000.0000."
                size="lg"
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Botón 'submit' */}
            <button
              type="submit"
              className="block w-full text-black rounded bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
            >
              Submit
            </button>
          </form>
          <div className="flex justify-center">
            <h2 className="mt-14 text-white">BondsApp 2024</h2>
          </div>
        </div>
      </section>
      {/* Toast container para mostrar mensajes de error/success */}
      <ToastContainer />
    </div>
  );
}
