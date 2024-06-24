import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { TEInput } from "tw-elements-react";
import { NavigationApp } from "../components/NavigationApp";

export function CreateBonds() {
  const [name, setName] = useState("");
  const [numer, setNumber] = useState(""); // Corregir el nombre del estado
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserId() {
      const username = localStorage.getItem("username");
      try {
        const userResponse = await axiosInstance.get(`/bonds/users/?username=${username}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bondData = {
      name,
      numer: parseInt(numer), 
      price: parseFloat(price).toFixed(4).toString(), 
      seller: userId,
      buyer: null
    };

    try {
      // Validación para asegurar que userId no sea null o undefined
      if (userId) {
        await axiosInstance.post("/bonds/bonds/", bondData);
        toast.success('Successfully')
        navigate("/my");
      } else {
        toast.error('Seller ID not available. Bond creation aborted.');
      }
    } catch (error) {
      toast.error('Error creating');
    }
  };

  return (
    <div>
      <NavigationApp />
      <section className="h-screen flex items-center justify-center">
        <div className="items-center justify-center">
          {/* título */}
          <h1 className="text-4xl font-bold mb-6 text-center">Create Bond</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* input nombre */}
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

            {/* input número */}
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

            {/* input precio */}
            <div className="mb-6">
              <label htmlFor="price" className="block text-white mb-2">
                Price
              </label>
              <TEInput
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                label="A numeric value in the range of 0 to 10,000,000."
                size="lg"
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* botón enviar */}
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
    </div>
  );
}
