import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { BentoTilt } from "./Features";
import { useGame } from '../context/GameContext';

gsap.registerPlugin(ScrollTrigger);

// GameTilt component (no changes needed)
export const GameTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 4;
    const tiltY = (relativeX - 0.5) * -4;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: transformStyle,
        transition: transformStyle ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// ===================================================================
// START: GameCard Component with All Fixes and Enhancements
// ===================================================================
export const GameCard = ({ 
  image, 
  title, 
  genre, 
  rating, 
  isComingSoon = false, 
  isPlayable = false,
  isHero = false,
  price = null,
  originalPrice = null,
  id
}) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useGame();
  
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [wishlistHover, setWishlistHover] = useState(0);
  const [wishlistCursor, setWishlistCursor] = useState({ x: 0, y: 0 });
  const hoverButtonRef = useRef(null);
  const wishlistButtonRef = useRef(null);

  const gameData = { id, image, title, genre, rating, price, originalPrice };

  // --- Mouse move/enter/leave handlers ---
  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleWishlistMouseMove = (event) => {
    if (!wishlistButtonRef.current) return;
    const rect = wishlistButtonRef.current.getBoundingClientRect();
    setWishlistCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);
  const handleWishlistEnter = () => setWishlistHover(1);
  const handleWishlistLeave = () => setWishlistHover(0);

  const handleWishlistToggle = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(gameData);
    }
  };

  return (
    <div className="relative size-full group">
      {/* Game Cover Image */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          loading={isHero ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-3 text-white sm:p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-start">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-nippo-light uppercase text-blue-300 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
              {genre}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 md:gap-2">
            {rating && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-nippo-light text-yellow-300 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                  ⭐ {rating}
                </span>
              </div>
            )}
            <button
              ref={wishlistButtonRef}
              onMouseMove={handleWishlistMouseMove}
              onMouseEnter={handleWishlistEnter}
              onMouseLeave={handleWishlistLeave}
              onClick={handleWishlistToggle}
              className={`opacity-0 group-hover:opacity-100 transition-all duration-300 relative overflow-hidden rounded-full p-1.5 md:p-2 backdrop-blur-sm cursor-pointer ${
                isInWishlist(id) 
                  ? 'bg-yellow-500/80'
                  : 'bg-black/60 hover:bg-black/80'
              }`}
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                  opacity: wishlistHover,
                  background: `radial-gradient(80px circle at ${wishlistCursor.x}px ${wishlistCursor.y}px, #F59E0B, #D97706)`,
                }}
              />
              <span className={`relative z-20 text-sm md:text-base lg:text-lg transition-colors duration-300 ${
                isInWishlist(id) ? 'text-white' : 'text-yellow-300'
              }`}>
                {isInWishlist(id) ? '♥' : '♡'}
              </span>
            </button>
          </div>
        </div>

        <div>
          {/* Add data-title attribute to h3 */}
          <h3 className={`game-title special-font font-zentry font-black mb-1 md:mb-2 ${
            isHero ? 'text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl' : 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
          }`} data-title={title}>
            {title}
          </h3>
          
          {isHero && (
            <p className="font-nippo-light text-xs sm:text-sm md:text-base lg:text-lg text-white/80 mb-2 md:mb-3 max-w-md">
              Experience the ultimate gaming adventure with cutting-edge graphics and immersive gameplay.
            </p>
          )}

          {price && (
            <div className="mb-2 md:mb-3">
              {originalPrice && (
                <span className="text-gray-400 line-through text-xs md:text-sm mr-1 md:mr-2">
                  ₹{originalPrice}
                </span>
              )}
              <span className="text-yellow-300 font-bold text-sm md:text-base lg:text-lg">₹{price}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3">
            {isPlayable && price && (
              <button
                ref={hoverButtonRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => addToCart(gameData)}
                disabled={isInCart(id)}
                className={`border-hsla relative flex w-fit items-center gap-1 overflow-hidden rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 text-xs md:text-sm uppercase font-bold backdrop-blur-sm transition-all duration-300 ${
                  isInCart(id)
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-yellow-300 text-black hover:bg-yellow-400 cursor-pointer'
                }`}
              >
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                  style={{
                    opacity: hoverOpacity,
                    background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #FBBF24, #F59E0B)`,
                  }}
                />
                <TiLocationArrow className="relative z-20 text-xs md:text-sm" />
                <span className="relative z-20 hidden sm:inline">{isInCart(id) ? 'In Cart' : 'Add to Cart'}</span>
                <span className="relative z-20 sm:hidden">{isInCart(id) ? 'Added' : 'Cart'}</span>
              </button>
            )}
            {isPlayable && !price && (
              <button
                className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-green-500 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 text-xs md:text-sm uppercase text-white font-bold backdrop-blur-sm transition-all duration-300 hover:bg-green-600"
              >
                <TiLocationArrow className="relative z-20 text-xs md:text-sm"/>
                <span className="relative z-20 hidden sm:inline">Play Now</span>
                <span className="relative z-20 sm:hidden">Play</span>
              </button>
            )}
            {isComingSoon && (
              <div
                className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/80 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 text-xs md:text-sm uppercase text-white/90 backdrop-blur-sm transition-all duration-300"
              >
                <div className="pointer-events-none absolute -inset-px" />
                <TiLocationArrow className="relative z-20 text-xs md:text-sm" />
                <span className="relative z-20 hidden sm:inline">Coming Soon</span>
                <span className="relative z-20 sm:hidden">Soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// ===================================================================
// END: GameCard Component
// ===================================================================

// Main Games Gallery Component
const GamesGallery = ({ gamesData }) => {
  useGSAP(() => {
    gsap.from(".games-gallery-title", {
      scrollTrigger: { trigger: ".games-gallery-title", start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" },
      y: 50, opacity: 0, duration: 1, ease: "power2.out",
    });
    gsap.from(".games-gallery-subtitle", {
      scrollTrigger: { trigger: ".games-gallery-subtitle", start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" },
      y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power2.out",
    });
    gsap.from(".game-card", {
      scrollTrigger: { trigger: ".games-section", start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" },
      opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out",
    });
  });

  return (
    <section id="games-gallery" className="bg-blue-75 py-20 md:pt-32">
      <div className="container mx-auto px-5 md:px-10">
        <div className="text-center mb-16">
          <div className="games-gallery-title mb-8">
            <h2 className="font-nippo-light text-lg uppercase md:text-[25px]">
              G∀ME ON
            </h2>
            <AnimatedTitle
              title=" Fe<b>at</b>ured Ga<b>m</b>es <br /> Colle<b>c</b>tion"
              containerClass="mt-5 !text-black text-center"
            />
          </div>
          <p className="games-gallery-subtitle font-nippo-light text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
            Discover our curated selection of immersive gaming experiences. From epic adventures to mind-bending puzzles.
          </p>
        </div>
        <div className="games-section">
          <div className="grid min-h-[90vh] w-full grid-cols-2 grid-rows-5 gap-7 md:grid-cols-3 md:grid-rows-3">
            <GameTilt className="game-card border-hsla bento-tilt_1 col-span-2 row-span-2 overflow-hidden rounded-md md:col-span-2 md:row-span-1">
              <GameCard {...gamesData[0]} isHero={true} />
            </GameTilt>
            <GameTilt className="game-card border-hsla bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 overflow-hidden rounded-md">
              <GameCard {...gamesData[1]} />
            </GameTilt>
            <GameTilt className="game-card border-hsla bento-tilt_1 row-span-1 ms-14 md:col-span-1 md:ms-0 overflow-hidden rounded-md">
              <GameCard {...gamesData[2]} />
            </GameTilt>
            <GameTilt className="game-card border-hsla bento-tilt_1 me-14 md:col-span-1 md:me-0 overflow-hidden rounded-md">
              <GameCard {...gamesData[3]} />
            </GameTilt>
            <GameTilt className="game-card border-hsla bento-tilt_2 row-span-1 md:col-span-1 overflow-hidden rounded-md">
              <GameCard {...gamesData[4]} />
            </GameTilt>
            <GameTilt className="game-card border-hsla bento-tilt_2 row-span-1 md:col-span-1 overflow-hidden rounded-md">
              <GameCard {...gamesData[5]} />
            </GameTilt>
            <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 md:col-span-1">
              <div className="flex size-full flex-col justify-between bg-gradient-to-br from-black to-violet-300 p-5">
                <h1 className="bento-title special-font max-w-64 text-blue-75">
                  N<b>e</b>w ga<b>m</b>es co<b>m</b>ing s<b>o</b>on!
                </h1>
                <TiLocationArrow className="m-5 scale-[5] self-end text-blue-75" />
              </div>
            </BentoTilt>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesGallery;