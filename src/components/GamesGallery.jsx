import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

// 3D Tilt component matching the quality of BentoTilt
export const GameTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 4; // Subtle tilt like Features section
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

// Individual Game Card Component
export const GameCard = ({ 
  image, 
  title, 
  genre, 
  rating, 
  isComingSoon = false, 
  isPlayable = false,
  isHero = false 
}) => {
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full group">
      {/* Game Cover Image */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-6 text-white md:p-8">
        <div className="flex justify-between items-start">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-nippo-light uppercase text-blue-300 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {genre}
            </span>
          </div>
          {rating && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-nippo-light text-yellow-300 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                ⭐ {rating}
              </span>
            </div>
          )}
        </div>

        <div>
          <h3 className={`game-title special-font font-zentry font-black mb-3 ${
            isHero ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'
          }`}>
            {title}
          </h3>
          
          {isHero && (
            <p className="font-nippo-light text-lg text-white/80 mb-4 max-w-md">
              Experience the ultimate gaming adventure with cutting-edge graphics and immersive gameplay.
            </p>
          )}

          {/* Action Button */}
          {isPlayable && (
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="border-hsla relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-blue-300/90 px-5 py-2.5 text-sm uppercase text-black font-bold backdrop-blur-sm transition-all duration-300 hover:bg-blue-300"
            >
              {/* Radial gradient hover effect */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                  opacity: hoverOpacity,
                  background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #EDFF66, #4FB7DD)`,
                }}
              />
              <TiLocationArrow className="relative z-20" />
              <span className="relative z-20">Play Now</span>
            </div>
          )}

          {isComingSoon && (
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="border-hsla relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-black/80 px-5 py-2.5 text-sm uppercase text-white/90 backdrop-blur-sm transition-all duration-300"
            >
              {/* Radial gradient hover effect */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                  opacity: hoverOpacity,
                  background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                }}
              />
              <TiLocationArrow className="relative z-20" />
              <span className="relative z-20">Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Games Gallery Component
const GamesGallery = () => {
  // Sample game data - you can replace with real data
  const gamesData = [
    {
      id: 1,
      image: "/img/gallery-1.webp",
      title: "Cyber Nexus",
      genre: "Sci-Fi RPG",
      rating: "4.8",
      isPlayable: true,
    },
    {
      id: 2,
      image: "/img/gallery-2.webp", 
      title: "Shadow Realm",
      genre: "Dark Fantasy",
      rating: "4.7",
      isPlayable: true,
    },
    {
      id: 3,
      image: "/img/gallery-3.webp",
      title: "Neon Runner",
      genre: "Cyberpunk",
      rating: "4.6",
      isComingSoon: true,
    },
    {
      id: 4,
      image: "/img/gallery-4.webp",
      title: "Mystic Quest",
      genre: "Adventure",
      rating: "4.9",
      isPlayable: true,
    },
    {
      id: 5,
      image: "/img/gallery-5.webp",
      title: "Steel Warriors",
      genre: "Action",
      rating: "4.5",
      isComingSoon: true,
    },
    {
      id: 6,
      image: "/img/swordman.webp",
      title: "Blade Master",
      genre: "Fighting",
      rating: "4.8",
      isPlayable: true,
    },
  ];

  // GSAP animation for scroll-triggered entrance
  useGSAP(() => {
    // Animate the main title
    gsap.from(".games-gallery-title", {
      scrollTrigger: {
        trigger: ".games-gallery-title",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Animate the subtitle
    gsap.from(".games-gallery-subtitle", {
      scrollTrigger: {
        trigger: ".games-gallery-subtitle",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
    });

    // Animate game cards with stagger effect
    gsap.from(".game-card", {
      scrollTrigger: {
        trigger: ".games-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Animate the action button
    gsap.from(".games-action-btn", {
      scrollTrigger: {
        trigger: ".games-action-btn",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power2.out",
    });
  });

  return (
    <section id="games-gallery" className="bg-blue-75 py-20 md:py-32">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="games-gallery-title">
            <AnimatedTitle
              title="Featured <b>G</b>ames <br /> Collecti<b>o</b>n"
              containerClass="!text-black mb-8"
            />
          </div>
          
          <p className="games-gallery-subtitle font-nippo-light text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
            Discover our curated selection of immersive gaming experiences. 
            From epic adventures to mind-bending puzzles.
          </p>
        </div>

        {/* Games Grid - Bento-style layout like Features section */}
        <div className="games-section mb-12">
          {/* Hero Game Card - Full width like Features */}
          <GameTilt className="game-card border-hsla relative mb-7 h-[60vh] w-full overflow-hidden rounded-xl md:h-[65vh]">
            <GameCard {...gamesData[0]} isHero={true} />
          </GameTilt>

          {/* Grid of smaller cards */}
          <div className="grid h-[120vh] w-full grid-cols-2 grid-rows-3 gap-7">
            <GameTilt className="game-card border-hsla relative col-span-2 row-span-1 overflow-hidden rounded-xl md:col-span-1 md:row-span-2">
              <GameCard {...gamesData[1]} />
            </GameTilt>

            <GameTilt className="game-card border-hsla relative col-span-1 row-span-1 ms-8 overflow-hidden rounded-xl md:col-span-1 md:ms-0">
              <GameCard {...gamesData[2]} />
            </GameTilt>

            <GameTilt className="game-card border-hsla relative col-span-1 row-span-1 me-8 overflow-hidden rounded-xl md:col-span-1 md:me-0">
              <GameCard {...gamesData[3]} />
            </GameTilt>

            <GameTilt className="game-card border-hsla relative col-span-1 row-span-1 overflow-hidden rounded-xl">
              <GameCard {...gamesData[4]} />
            </GameTilt>

            <GameTilt className="game-card border-hsla relative col-span-1 row-span-1 overflow-hidden rounded-xl">
              <GameCard {...gamesData[5]} />
            </GameTilt>
          </div>
        </div>

        {/* Action Button */}
        <div className="games-action-btn text-center">
          <Button
            title="Explore All Games"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-violet-300 text-white hover:bg-violet-300/90 transition-colors duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default GamesGallery;
