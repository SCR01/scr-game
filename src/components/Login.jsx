import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

const Login = ({ setUser }) => {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Main Login Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-white/70 text-white rounded-lg hover:bg-white/10 transition"
      >
        Login
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-gray-800 border border-white/30 rounded-lg shadow-lg">
          <button
            onClick={loginWithGoogle}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg"
          >
            Login with Google
          </button>
          <button
            onClick={loginWithGithub}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg"
          >
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
