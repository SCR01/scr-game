import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Nexus from './components/Nexus'
import Vault from './components/Vault'
import Prologue from './components/Prologue'
import Footer from './components/Footer'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
    
    <Hero/>
   <Navbar/>
    <About/>
    <Features/>
    <Story/>
    <Nexus/>
    <Vault/>
    <Prologue/>
    <Contact/>
    <Footer/>

    </main>
  )
}

export default App