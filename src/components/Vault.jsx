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
    }).to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      duration: 1,
    });
  });

  return (
    <div id="vault" className="min-h-screen w-screen bg-zinc-900 text-white">
      <div className="relative mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase">Unlock the Vault</h2>
        <AnimatedTitle
          title="G<b>a</b>ther your<br /> digital we<b>a</b>lth"
          containerClass="mt-5 text-center"
        />
        <div className="about-subtext">
          <p>All your items, tokens, and lore reside in the Vault.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="vault-clip">
        <div className="mask-clip-path about-image">
          <img
            src="https://i.redd.it/37eltgiyksz81.jpg"
            alt="Vault Visual"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Vault;
