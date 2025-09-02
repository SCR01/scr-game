/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Nexus", href: "#about" },
  { name: "Vault", href: "#features" },
  { name: "Prologue", href: "#story" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// Volume icons
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

// Authentication Component
const AuthComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  
  const { user, loginWithGoogle, loginWithGithub, logout } = useAuth();

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogin = async (loginFunction) => {
    try {
      setIsLoading(true);
      setIsOpen(false);
      await loginFunction();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // If user is logged in, show profile dropdown
  if (user) {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-white rounded-xl hover:from-yellow-400/30 hover:to-yellow-600/30 transition-all duration-300 backdrop-blur-sm"
        >
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-8 h-8 rounded-full border border-yellow-400/50"
            />
          )}
          <span className="font-medium text-sm hidden sm:block">
            {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-yellow-400/30 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
              <p className="text-white font-semibold truncate">
                {user.displayName || 'Game Player'}
              </p>
              <p className="text-yellow-400/80 text-sm truncate">{user.email}</p>
              <p className="text-gray-400 text-xs mt-1">
                via {user.providerData[0]?.providerId === 'google.com' ? 'Google' : 'GitHub'}
              </p>
            </div>
            
            <div className="p-2">
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-white hover:bg-yellow-500/20 hover:text-yellow-400 transition-all duration-200 rounded-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-white hover:bg-yellow-500/20 hover:text-yellow-400 transition-all duration-200 rounded-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
              
              <div className="border-t border-yellow-400/20 mt-2 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If user is not logged in, show login dropdown
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Login'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-xl border border-yellow-400/30 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2 space-y-1">
            <button
              type="button"
              onClick={() => handleLogin(loginWithGoogle)}
              className="flex items-center gap-3 w-full text-left px-4 py-3 text-white hover:bg-yellow-500/20 hover:text-yellow-400 transition-all duration-200 rounded-lg disabled:opacity-50"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium">Continue with Google</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleLogin(loginWithGithub)}
              className="flex items-center gap-3 w-full text-left px-4 py-3 text-white hover:bg-yellow-500/20 hover:text-yellow-400 transition-all duration-200 rounded-lg disabled:opacity-50"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-medium">Continue with GitHub</span>
            </button>
          </div>
          
          <div className="px-4 py-3 bg-yellow-400/5 border-t border-yellow-400/20">
            <p className="text-xs text-gray-400 text-center">
              Secure login powered by Firebase
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ gameTitles = [] }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Floating navbar on scroll
  useEffect(() => {
    if (currentScrollY > 0) navContainerRef.current?.classList.add("floating-nav");
    else navContainerRef.current?.classList.remove("floating-nav");
  }, [currentScrollY]);

  // Toggle audio
  const toggleAudio = () => setIsAudioPlaying((prev) => !prev);

  // Play/pause audio effect
  useEffect(() => {
    const audioEl = audioElementRef.current;
    if (audioEl) {
      if (isAudioPlaying) audioEl.play().catch((e) => console.error("Audio play failed:", e));
      else audioEl.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 h-20 transition-all duration-700 sm:inset-x-6 bg-black/50 backdrop-blur-sm"
    >
      <header className="w-full">
        <nav className="flex items-center justify-between p-4">
          {/* Left Section */}
          <div className="flex items-center gap-4 md:gap-7">
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
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, i) => (
                <a key={i} href={item.href} className="nav-hover-btn">
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

            {/* Authentication Component */}
            <div className="ml-2">
              <AuthComponent />
            </div>

            {/* Audio Button */}
            <button
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/30 backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110"
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? "Pause background music" : "Play background music"}
              aria-pressed={isAudioPlaying}
            >
              <div
                className={`absolute inset-0 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(252,211,77,0.5)] transition-transform duration-500 ease-out ${
                  isAudioPlaying ? "translate-y-0" : "translate-y-full"
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

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden ml-2 p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-sm p-4 space-y-3">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="block text-white hover:text-yellow-400 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#games-gallery"
              className="block text-white hover:text-yellow-400 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Games
            </a>
            <a
              href="#cart-wishlist"
              className="block text-white hover:text-yellow-400 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </a>
          </div>
        )}

        {/* Hidden audio element */}
        <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
      </header>
    </div>
  );
};

export default Navbar;