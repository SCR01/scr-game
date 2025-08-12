/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import SearchBar from "./SearchBar";

// Navigation items - updated with correct section IDs
const navItems = [
  { name: "Nexus", href: "#about" },
  { name: "Vault", href: "#features" },
  { name: "Prologue", href: "#story" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ gameTitles = [] }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.remove("floating-nav");
      navContainerRef.current.classList.add("floating-view");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-view");
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 h-20 transition-all duration-700 sm:inset-x-6 z-50"
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
            <SearchBar gameTitles={gameTitles} />
          </div>

          {/* Right Section */}
          <div className="flex h-full items-center">
            <div className="hidden md:flex items-center space-x-6">
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
            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
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
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
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
