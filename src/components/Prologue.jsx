import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Prologue = () => {
  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#prologue-clip",
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
    <div id="prologue" className="min-h-screen w-screen bg-black text-white">
      <div className="relative mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase">The Prologue</h2>
        <AnimatedTitle
          title="Every s<b>t</b>ory<br /> h<b>a</b>s a beginning"
          containerClass="mt-5 text-center"
        />
        <div className="about-subtext">
          <p>Before the chaos, there was only silence.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="prologue-clip">
        <div className="mask-clip-path about-image">
          <img
            src="https://assets1.ignimgs.com/2020/01/07/prologue---button-01-1578438169648.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80"
            alt="Prologue Visual"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Prologue;
