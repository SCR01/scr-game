import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Vault = () => {
  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#vault-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    }).to(".mask-clip-path-vault", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      ease: "power2.out",
      duration: 1.5,
    });
  });

  return (
    <div id="vault" className="min-h-screen w-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white">
      <div className="relative mt-36 flex flex-col items-center gap-5 max-w-3xl mx-auto px-4 text-center backdrop-blur-md bg-white/5 rounded-2xl shadow-lg py-10">
        <h2 className="font-general text-sm uppercase tracking-widest text-zinc-300">Unlock the Vault</h2>
        <AnimatedTitle
          title="G<b>a</b>ther your<br /> digital we<b>a</b>lth"
          containerClass="mt-5 text-center text-4xl font-bold"
        />
        <div className="about-subtext text-zinc-400 mt-4">
          <p>All your items, tokens, and lore reside in the Vault.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="vault-clip">
        <div className="mask-clip-path-vault about-image relative overflow-hidden backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl">
          <img
            src="https://i.redd.it/37eltgiyksz81.jpg"
            alt="Vault Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Vault;
