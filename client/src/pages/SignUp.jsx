import React, { useState } from "react";
import { TEInput } from "tw-elements-react";
import { Navigation } from "../components/Navigation";
import axiosInstance from "../services/axiosInstance"; // Asegúrate de importar tu instancia de axios configurada
import toast from "react-hot-toast";

export function SignUp() {
  {
    /* constantes donde se guardaran lo que se enviara para realizar el registro de usuario*/
  }
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = {
      email,
      username,
      password,
      password2,
    };

    try {
      await axiosInstance.post("/bonds/register/", userData);
      // Aquí podrías redirigir al usuario a una página de éxito o hacer alguna otra acción
      setError("");
      toast.success("Successfully");
    } catch (error) {
      toast.error("Error creating user, cheack the user or email");
      setError("Error creating user, please try again.");
    }
  };

  return (
    <div>
      <Navigation />
      <section className="h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* input nombre */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-white mb-2">
                Username
              </label>
              <TEInput
                id="username"
                type="text"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* input correo */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-white mb-2">
                Email address
              </label>
              <TEInput
                id="email"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* input contraseña*/}
            <div className="mb-6">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <TEInput
                id="password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* input confirmar contraseñas */}
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-white mb-2"
              >
                Confirm Password
              </label>
              <TEInput
                id="confirm-password"
                type="password"
                size="lg"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            {error && (
              <div className="text-red-500 text-center mb-6">{error}</div>
            )}

            <div>
              {/* botón registrar */}
              <button
                type="submit"
                className="block w-full rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <h2 className="mt-14 text-white">BondsApp 2024</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
