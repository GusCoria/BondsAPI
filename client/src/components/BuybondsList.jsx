import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

// pagina de venta de bonos

const BuybondsList = () => {
  const [bonds, setBonds] = useState([]);
  const [currency, setCurrency] = useState("MXN"); // Estado para la moneda seleccionada
  //
  useEffect(() => {
    async function loadBonds() {
      try {
        //se obtienen todos los bonds
        const bondsResponse = await axiosInstance.get("/bonds/bonds/");
        const bondsData = bondsResponse.data;

        // Obtenemos el correo del usuario vendedor para cada bono
        const userIds = bondsData.map((bond) => bond.seller);
        const usersResponse = await axiosInstance.get(
          `/bonds/users/?ids=${userIds.join(",")}`
        );
        const usersMap = new Map(
          usersResponse.data.map((user) => [user.id, user.email])
        );

        // Actualizamos los bonos con el correo del vendedor y otros datos necesarios
        const updatedBonds = bondsData.map((bond) => ({
          ...bond,
          sellerEmail: usersMap.get(bond.seller) || "Unknown Seller",
        }));

        setBonds(updatedBonds);
      } catch (error) {
        console.error("Error fetching bonds:", error);
      }
    }

    loadBonds();
  }, [currency]);

  //funcion para realizar el update del buyer verificando que no ha sido comprado y que no sea de el mismo
  // se ocupo el username para obtener el id y ir comparando los id de las claves foraneas
  const handleBuyBond = async (bondId) => {
    try {
      const username = localStorage.getItem("username");
      const userResponse = await axiosInstance.get(
        `/bonds/users/?username=${username}`
      );
      const userId = userResponse.data[0].id;

      const bondToBuy = bonds.find((bond) => bond.id === bondId);

      // Verificar si el bono ya tiene un comprador
      if (bondToBuy.buyer) {
        toast.error("Bond  already has a buyer.");
        return;
      }

      // Verificar si el usuario intenta comprar su propio bono
      if (bondToBuy.seller === userId) {
        toast.error("You cannot buy your own bond");
        return;
      }

      const updatedBond = {
        ...bondToBuy,
        buyer: userId,
      };

      await axiosInstance.put(`/bonds/bonds/${bondId}/`, updatedBond);

      // Actualizar localmente el estado de bonds para reflejar el cambio
      const updatedBonds = bonds.map((bond) =>
        bond.id === bondId ? { ...bond, buyer: userId } : bond
      );
      setBonds(updatedBonds);
    } catch (error) {
      console.error("Error buying bond:", error);
    }
  };

  return (
    <section className="h-screen">
      <div className="max-w-screen p-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Buy Bonds</h1>
      </div>
      <div className="flex-grow">
        <div className="overflow-x-auto">
          {/* creacion de tabla */}
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seller Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/*impementacion de los valores */}
            <tbody>
              {bonds.map((bond, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {bond.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {bond.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    ${bond.price}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {currency}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {bond.numer}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {bond.sellerEmail}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button
                      type="button"
                      className="rounded text-white bg-cyan-400 px-4 py-2 text-sm"
                      onClick={() => handleBuyBond(bond.id, bond.seller)}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <h2 className="mt-14 text-white">BondsApp 2024</h2>
      </div>
    </section>
  );
};

export default BuybondsList;
