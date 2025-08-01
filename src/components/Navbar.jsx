/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
// We are no longer using react-icons for the audio button.
import { useWindowScroll } from "react-use";

const navItems = [
  { name: "Nexus", href: "#about" },
  { name: "Vault", href: "#features" },
  { name: "Prologue", href: "#story" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// ===================================================================
// START: Custom Thematic SVG Icons
// These are designed to perfectly match the website's futuristic UI.
// ===================================================================

const VolumeOnIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const VolumeOffIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);
// ===================================================================
// END: Custom Thematic SVG Icons
// ===================================================================

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Add floating nav class when scrolled (for styling effects only)
  useEffect(() => {
    if (currentScrollY > 0) {
      navContainerRef.current?.classList.add("floating-nav");
    } else {
      navContainerRef.current?.classList.remove("floating-nav");
    }
  }, [currentScrollY]);

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  // Effect to play or pause audio
  useEffect(() => {
    const audioEl = audioElementRef.current;
    if (audioEl) {
      if (isAudioPlaying) {
        audioEl.play().catch(error => console.error("Audio play failed:", error));
      } else {
        audioEl.pause();
      }
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 h-20 transition-all duration-700 sm:inset-x-6"
    >
      <header className="w-full">
        <nav className="flex items-center justify-between p-4">
          {/* Left Section */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right Section */}
          <div className="flex h-full items-center">
            <div className="hidden items-center space-x-6 md:flex">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="nav-hover-btn">
                  {item.name}
                </a>
              ))}
              <a href="#games-gallery" className="nav-hover-btn">
                Games
              </a>
              <a href="#cart-wishlist" className="nav-hover-btn">
                Cart
              </a>
            </div>

            {/* Themed Audio Button with Custom SVG Icons */}
            <button
              className="relative ml-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/30 backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110"
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? "Pause background music" : "Play background music"}
              aria-pressed={isAudioPlaying}
            >
              {/* Animated yellow background */}
              <div
                className={`absolute inset-0 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(252,211,77,0.5)] transition-transform duration-500 ease-out ${
                  isAudioPlaying ? 'translate-y-0' : 'translate-y-full'
                }`}
              />
              
              {/* Icon container */}
              <span className="relative z-10">
                {isAudioPlaying ? (
                  <VolumeOnIcon className="h-5 w-5 text-black" />
                ) : (
                  <VolumeOffIcon className="h-5 w-5 text-white" />
                )}
              </span>
            </button>
            
            <audio
              ref={audioElementRef}
              className="hidden"
              src="/audio/loop.mp3"
              loop
            />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;