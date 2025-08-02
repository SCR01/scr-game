// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
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
  );
};

export default App;
