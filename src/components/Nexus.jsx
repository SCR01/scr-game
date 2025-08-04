import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Nexus = () => {
  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#nexus-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    }).to(".mask-clip-path-nexus", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      ease: "power2.out",
      duration: 1.5,
    });
  });

  return (
    <div id="nexus" className="min-h-screen w-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="relative mt-36 flex flex-col items-center gap-5 max-w-3xl mx-auto px-4 text-center backdrop-blur-md bg-white/5 rounded-2xl shadow-lg py-10">
        <h2 className="font-general text-sm uppercase tracking-widest text-zinc-300">Enter the Nexus</h2>
        <AnimatedTitle
          title="Step <b>in</b>to the center<br/> of all d<b>e</b>cisions"
          containerClass="mt-5 text-center text-4xl font-bold"
        />
        <div className="about-subtext text-zinc-400 mt-4">
          <p>The Nexus connects every layer of your reality in the Matrix.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="nexus-clip">
        <div className="mask-clip-path-nexus about-image relative overflow-hidden backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl">
          <img
            src="https://assets2.razerzone.com/images/pnx.assets/2ce96ca152420023fc7569e1ba85023a/nexus-kishiultra-pgupdate-desktop-hero.webp"
            alt="Nexus Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Nexus;
