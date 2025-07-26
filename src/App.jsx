import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import GamesGallery from './components/GamesGallery'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorTrail from "./components/CursorTrail/CursorTrail";

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
    <CursorTrail />
    <Hero/>
   <Navbar/>
    <About/>
    <Features/>
    <GamesGallery/>
    <Story/>
    <Contact/>
    <Footer/>

    </main>
  )
}

export default App