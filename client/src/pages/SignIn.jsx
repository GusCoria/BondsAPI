import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TEInput } from "tw-elements-react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Simulación de autenticación
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      // Redirigir al usuario a la página "/my"
      navigate("/my");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSignIn}>
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-white mb-2">
              Email address
            </label>
            <TEInput
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white w-full px-3 py-2 border-gray-300"
            />
          </div>

          {/* <!--Password input--> */}
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

          {/* <!-- Error message --> */}
          {error && <p className="text-red-500 mb-6">{error}</p>}

          {/* <!-- Login button --> */}
          <button
            type="submit"
            className="block w-full rounded text-black bg-cyan-400 px-6 pb-2 pt-2.5 text-xs uppercase font-medium"
          >
            Sign In
          </button>

          {/* <!-- Register link --> */}
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 hover:text-blue-700 ml-1">
              Register
            </Link>
          </p>
        </form>
        <div className="flex justify-center">
          <h2 className="mt-14 text-white">BondsApp 2024</h2>
        </div>
      </div>
    </section>
  );
}
