import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Notfound.css" // import custom styles for cursor fix

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | SCR-Game";
  }, []);

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="notfound-cursor-fix flex flex-col items-center justify-center min-h-screen max-h-screen bg-gradient-to-br from-black via-purple-950 to-blue-900 text-yellow-300 p-6 text-center relative overflow-hidden">
      {/* Subtle glowing background effect (no blocking cursor) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,0,0.05),transparent_70%)] pointer-events-none"></div>

      <h1 className="text-[8rem] sm:text-[10rem] font-extrabold mb-4 select-none drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]">
        404
      </h1>

      <p className="text-2xl sm:text-3xl font-bold mb-6 tracking-wider text-yellow-200">
        Lost in the Metagame
      </p>

      <p className="max-w-md mb-10 text-lg text-yellow-200/80 font-light">
        Oops! The page you are looking for does not exist.  
        The portal might be broken, or you’ve wandered into the wrong realm.  
      </p>

      <button
        onClick={goHome}
        className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/30 transition-all duration-300 cursor-pointer transform hover:scale-105"
      >
        Return to Lobby
      </button>
    </div>
  );
};

export default NotFound;
