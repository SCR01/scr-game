// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GameProvider } from './context/GameContext';

import CursorTrail from './components/CursorTrail/CursorTrail';
import OnTopBar from './components/OnTopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Nexus from './pages/Nexus';
import Vault from './pages/Vault';
import Prologue from './pages/Prologue';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
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

      <Router>
        <main className="relative min-h-screen w-screen overflow-x-hidden">
          <CursorTrail />
          <OnTopBar />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nexus" element={<Nexus />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/prologue" element={<Prologue />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </main>
      </Router>
    </GameProvider>
  );
};

export default App;
