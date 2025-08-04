/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { Link } from "react-router-dom";

// Thematic SVG Icons
const VolumeOnIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const VolumeOffIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

// Navigation items
const navItems = [
  { label: "Nexus", path: "/nexus" },
  { label: "Vault", path: "/vault" },
  { label: "Prologue", path: "/prologue" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Track scroll direction for nav visibility
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  // GSAP animation on nav show/hide
  useEffect(() => {
    const tween = gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
    return () => tween.kill();
  }, [isNavVisible]);

  // Toggle audio play/pause
  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioElementRef.current;
    if (audio) {
      if (isAudioPlaying) {
        audio.play().catch((err) => console.warn("Audio play failed:", err));
      } else {
        audio.pause();
      }
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-all duration-500 sm:inset-x-6 ${
        isNavVisible ? "floating-nav" : "floating-view"
      }`}
    >
      <header className="w-full">
        <nav className="flex items-center justify-between p-4">
          {/* Left: Logo + Button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" loading="lazy" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right: Nav Links + Audio */}
          <div className="flex h-full items-center">
            <div className="hidden items-center space-x-6 md:flex">
              {navItems.map((item, index) => (
                <Link key={index} to={item.path} className="nav-hover-btn">
                  {item.label}
                </Link>
              ))}
              <a href="#games-gallery" className="nav-hover-btn">Games</a>
              <a href="#cart-wishlist" className="nav-hover-btn">Cart</a>
            </div>

            {/* Audio Button */}
            <button
              className="relative ml-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/30 backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110"
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? "Pause background music" : "Play background music"}
              aria-pressed={isAudioPlaying}
            >
              <div
                className={`absolute inset-0 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(252,211,77,0.5)] transition-transform duration-500 ease-out ${
                  isAudioPlaying ? 'translate-y-0' : 'translate-y-full'
                }`}
              />
              <span className="relative z-10">
                {isAudioPlaying ? (
                  <VolumeOnIcon className="h-5 w-5 text-black" />
                ) : (
                  <VolumeOffIcon className="h-5 w-5 text-white" />
                )}
              </span>
            </button>

            {/* Audio element */}
            <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
