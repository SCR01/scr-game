import React, { useState } from "react";
import { Toaster } from 'sonner';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Features from './components/Features';
import GamesGallery from './components/GamesGallery';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail/CursorTrail';
import CartWishlist from './components/CartWishlist';
import { GameProvider } from './context/GameContext';
import OnTopBar from './components/OnTopBar';

const App = () => {
  
  // Centralize the gamesData here
  const gamesData = [
    {
      id: 1,
      image: "/img/gallery-1.webp",
      title: "Cyber Nexus",
      genre: "Sci-Fi RPG",
      rating: "4.8",
      isPlayable: true,
      price: "1999",
      originalPrice: "2999",
    },
    {
      id: 2,
      image: "/img/gallery-2.webp",
      title: "Shadow Realm",
      genre: "Dark Fantasy",
      rating: "4.7",
      isPlayable: true,
      price: "1599",
    },
    {
      id: 3,
      image: "/img/gallery-3.webp",
      title: "Neon Runner",
      genre: "Cyberpunk",
      rating: "4.6",
      isComingSoon: true,
      price: "2499",
    },
    {
      id: 4,
      image: "/img/gallery-4.webp",
      title: "Mystic Quest",
      genre: "Adventure",
      rating: "4.9",
      isPlayable: true,
      price: "999",
      originalPrice: "1499",
    },
    {
      id: 5,
      image: "/img/gallery-5.webp",
      title: "Steel Warriors",
      genre: "Action",
      rating: "4.5",
      isComingSoon: true,
      price: "1799",
    },
    {
      id: 6,
      image: "/img/swordman.webp",
      title: "Blade Master",
      genre: "Fighting",
      rating: "4.8",
      isPlayable: true,
      // Free game - no price
    },
  ];

  const gameTitles = gamesData.map((game) => game.title);
 const [user, setUser] = useState(null);
  return (
    <GameProvider>
      <Toaster 
        richColors 
        position="top-right"
        expand={true}
        closeButton={true}
        duration={5000}
        className="font-nippo-light"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: '20px',
            fontSize: '15px',
            fontWeight: '600',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4)',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.5px',
            minWidth: '320px',
            maxWidth: '400px',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%)',
              border: '2px solid rgba(34, 197, 94, 0.5)',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
              color: 'white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'rgba(34, 197, 94, 0.9)',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%)',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
              color: 'white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'rgba(239, 68, 68, 0.9)',
            },
          },
        }}
      />
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <CursorTrail />
        <Navbar gameTitles={gameTitles} user={user} setUser={setUser} />
        <Hero />
        <About />
        <Features />
        <GamesGallery gamesData={gamesData} />
        <Story />
        <div className="mb-32">
          <CartWishlist />
        </div>
        <Contact />
        <Footer />
        <OnTopBar />
      </main>
    </GameProvider>
  );
};

export default App;
