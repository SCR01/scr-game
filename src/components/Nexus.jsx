import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Nexus = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#nexus-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      duration: 1,
    });
  });

  return (
    <div id="nexus" className="min-h-screen w-screen bg-black text-white">
      <div className="relative mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase">Enter the Nexus</h2>
        <AnimatedTitle
          title="Step <b>in</b>to the center<br/> of all d<b>e</b>cisions"
          containerClass="mt-5 text-center"
        />
        <div className="about-subtext">
          <p>The Nexus connects every layer of your reality in the Matrix.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="nexus-clip">
        <div className="mask-clip-path about-image">
          <img
            src="https://assets2.razerzone.com/images/pnx.assets/2ce96ca152420023fc7569e1ba85023a/nexus-kishiultra-pgupdate-desktop-hero.webp"
            alt="Nexus Visual"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Nexus;
