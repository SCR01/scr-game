import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaEnvelope } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: "https://www.linkedin.com/in/sharad-chandra-reddy-b0737a231/", icon: <FaLinkedin /> },
  { href: "https://github.com/SCR01", icon: <FaGithub /> },
  { href: "https://portfolio-scr.vercel.app/", icon: <FaGlobe /> },
  { href: "https://x.com/home", icon: <FaXTwitter /> },
  { href: "mailto:scr.contact@email.com", icon: <FaEnvelope /> },
];

const Footer = () => {
  const footerRef = useRef(null);
  const [showGitHubStar, setShowGitHubStar] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    const timer = setTimeout(() => setShowGitHubStar(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#0f0f1c] text-white py-12 px-6 md:px-16">
      <div className="container mx-auto grid gap-12 md:grid-cols-3 items-start">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/img/logo.png"
              alt="SCR Logo"
              className="w-10 h-10"
              loading="lazy"
            />
            <span className="text-2xl font-semibold">SCR Gaming</span>
          </div>
          <p className="text-sm text-gray-400">
            Made with ❤️ using React, GSAP & Tailwind CSS
          </p>
        </div>

        {/* Social + Star Button */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-gray-400">Follow us on:</p>
          <div className="flex gap-6 text-2xl">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
          {/* star button */}
          {showGitHubStar && (
            <a
              href="https://github.com/SCR01/scr-game"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#DFDFF0] text-black px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
            >
              ⭐ Star on GitHub
            </a>
          )}
        </div>

        {/* Legal Info */}
        <div className="flex flex-col md:items-end items-center text-sm text-gray-400 gap-2 text-center md:text-right">
          <a href="#privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <p>© 2025 SCR Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
