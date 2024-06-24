import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TEInput } from "tw-elements-react";
import axiosInstance from "../services/axiosInstance";
import { Navigation } from "../components/Navigation";
import toast from "react-hot-toast"; // carteles de notificacion

{
  /* funcion para obtener el login y el token para las peticiones con el backend*/
}

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  {
    /* barra de navegacion de signin y singup */
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/bonds/token/", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Guardar el token
        localStorage.setItem("accessToken", response.data.access);

        // guarda el username del usuario para manter informacion del usuario y realizar depues peticiones
        localStorage.setItem("username", username);
        toast.success("Successfully");
        navigate("/my");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div>
      <Navigation />
      <section className="h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="mb-6">
              {/* cuadro imput username*/}
              <label htmlFor="username" className="block text-white mb-2">
                Username
              </label>
              <TEInput
                type="text"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-white w-full px-3 py-2 border-gray-300"
              />
            </div>
            {/* cuadro imput contraseña */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <TEInput
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white w-full px-3 py-2 bg-white"
              />
            </div>

            {error && <p className="text-red-500 mb-6">{error}</p>}

            <button
              type="submit"
              className="block w-full rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs uppercase font-medium"
            >
              Sign In
            </button>

            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Don't have an account?
              {/* link para mandar a la pagina de signup */}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 ml-1"
              >
                Register
              </Link>
            </p>
          </form>
          <div className="flex justify-center">
            <h2 className="mt-14 text-white">BondsApp 2024</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
