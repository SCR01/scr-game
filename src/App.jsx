import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import GamesGallery from './components/GamesGallery'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorTrail from "./components/CursorTrail/CursorTrail";
import CartWishlist from './components/CartWishlist'
import { GameProvider } from './context/GameContext'
import OnTopBar from './components/OnTopBar'

const App = () => {
  return (
    <GameProvider>
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <CursorTrail />
        <Hero/>
        <Navbar/>
        <About/>
        <Features/>
        <GamesGallery/>
        <Story/>
        <div className="mb-32">
          <CartWishlist/>
        </div>
        <Contact/>
        <Footer/>
        <OnTopBar />
      </main>
    </GameProvider>
  )
}

export default App