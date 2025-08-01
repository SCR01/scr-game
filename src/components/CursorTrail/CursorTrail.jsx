import React, { useEffect, useRef } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
  const circlesRef = useRef([]);
  const positions = useRef(Array(12).fill({ x: 0, y: 0 }));
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const numCircles = 12;

  useEffect(() => {
    const circles = circlesRef.current;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const animate = () => {
      // Leader follows the mouse
      let leaderX = positions.current[0].x;
      let leaderY = positions.current[0].y;

      leaderX += (mousePos.current.x - leaderX) * 0.25;
      leaderY += (mousePos.current.y - leaderY) * 0.25;

      positions.current[0] = { x: leaderX, y: leaderY };

      // Followers
      for (let i = 1; i < numCircles; i++) {
        let currentX = positions.current[i].x;
        let currentY = positions.current[i].y;

        const followX = positions.current[i - 1].x;
        const followY = positions.current[i - 1].y;

        currentX += (followX - currentX) * 0.25;
        currentY += (followY - currentY) * 0.25;

        positions.current[i] = { x: currentX, y: currentY };
      }

      // Apply positions using left/top and scale (like old code)
      circles.forEach((circle, index) => {
        if (circle) {
          const { x, y } = positions.current[index];
          const scale = (numCircles - index) / numCircles;
          const offset = 12; // center the circle

          circle.style.left = `${x - offset}px`;
          circle.style.top = `${y - offset}px`;
          circle.style.transform = `scale(${scale})`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Render trail circles
  const circleElements = Array.from({ length: numCircles }, (_, index) => (
    <div
      key={index}
      className="circle"
      ref={(el) => (circlesRef.current[index] = el)}
      style={{ backgroundColor: 'white' }}
    ></div>
  ));

  return <div className="cursor">{circleElements}</div>;
};

export default CursorTrail;
