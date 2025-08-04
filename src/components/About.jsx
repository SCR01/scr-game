import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      duration: 1,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-nippo-light text-lg uppercase md:text-[25px]">
          Welcome to MATRIX
        </h2>
        <AnimatedTitle
          title=" Re<b>de</b>fine reality <br /> Embrace the un<b>k</b>nown"
          containerClass="mt-5 !text-black text-center"
        />
        <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]"></div>
        <div className="about-subtext">
          <p className="font-nippo-light">
            Step into the simulation where your imagination shapes the future.
          </p>

          <p>· · ─ ·✶· ─ · ·</p>

          <p className="font-nippo-light">
            <b>MATRIX</b> — One world, infinite dimensions. Your journey starts
            now.
          </p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
