import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

// pagina para enlistar las bonds de las cuales es dueño el usuario asi como de ensaeñar si se vendieron o no
const MybondsList = () => {
  const [bonds, setBonds] = useState([]);
  const [userId, setUserId] = useState(null); // Estado para el ID del usuario
  const [currency, setCurrency] = useState("MXN"); // Estado para la moneda seleccionada

  //
  useEffect(() => {
    async function loadUserAndBonds() {
      try {
        const username = localStorage.getItem("username");

        if (username) {
          const userResponse = await axiosInstance.get(
            `/bonds/users/?username=${username}`
          );
          const user = userResponse.data[0]; //devuelve el usuario siendo buscado por su username
          setUserId(user.id); // se guarda el id para despues buscar los bonds que tengan como seller el mismo id
          const bondsResponse = await axiosInstance.get(`/bonds/bonds/`);
          setBonds(bondsResponse.data); //se obtienen todos los bonds
        }
      } catch (error) {
        console.error("Error fetching user or bonds:", error);
      }
    }
    loadUserAndBonds();
  }, [currency]); // Añade currency como dependencia para que se actualice cuando cambie

  return (
    <section className="h-screen">
      <div className="max-w-screen p-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Bonds</h1>
        {/* boton para crear un bond nuevo */}
        <Link to="/create" className="block">
          <button
            type="button"
            className="rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs uppercase font-medium shadow-md"
          >
            Create Bond
          </button>
        </Link>
      </div>
      <div className="flex-grow">
        <div className="overflow-x-auto">
          {/* tabla  */}
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bonds
                .filter((bond) => bond.seller === userId) // Filtrar bonos usando el seller y comparandolos con el id del usuario
                .map((bond, index) => (
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
                      {bond.buyer ? "Bought" : "Available"}
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

export default MybondsList;
