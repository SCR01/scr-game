/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { Link } from "react-router-dom"; 

// Navigation items and their corresponding routes
const navItems = [
  { label: "Nexus", path: "/nexus" },
  { label: "Vault", path: "/vault" },
  { label: "Prologue", path: "/prologue" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Handle scroll direction and update nav visibility
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  // Animate nav in/out with GSAP
  useEffect(() => {
    const tween = gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power2.out",
    });

    return () => tween.kill();
  }, [isNavVisible]);

  // Toggle audio playback
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch((err) =>
        console.warn("Audio autoplay failed:", err)
      );
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-0 h-20 transition-all duration-700 sm:inset-x-6 z-50 ${
        isNavVisible ? "floating-nav" : "floating-view"
      }`}
    >
      <header className="w-full">
        <nav className="flex items-center justify-between p-4">
          {/* Left Section */}
          <div className="flex items-center gap-7">
            <img
              src="/img/logo.png"
              alt="logo"
              className="w-10"
              loading="lazy"
            />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right Section */}
          <div className="flex h-full items-center">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <a
  key={index}
  href={item.path}
  target="_blank"
  rel="noopener noreferrer"
  className="nav-hover-btn"
>
  {item.label}
</a>

              ))}
            </div>

            {/* Audio Toggle Button */}
            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
              aria-label={
                isAudioPlaying ? "Pause background audio" : "Play background audio"
              }
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                ></div>
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
