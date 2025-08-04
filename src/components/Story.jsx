import gsap from "gsap";
import { useRef } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-screen w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-nippo-light text-lg uppercase md:text-[20px]">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Button Section - Finalized Version */}
        <div className="mt-10 flex w-full justify-center md:mt-10 md:me-0 md:justify-center">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-nippo-light text-lg text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            {/* Real Button - Now White */}
            <div className="mt-5">
              <Button
                id="realm-btn"
                title="discover prologue"
                containerClass="bg-white text-black px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
