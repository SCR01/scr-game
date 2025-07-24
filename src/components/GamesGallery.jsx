import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GamesGallery.css';

import spaceBlaster from '../assets/space_blaster.jpg';
import cyberWorld from '../assets/cyber-world.jpg';
import puzzleMania from '../assets/puzzle-mania.png';
import racingThunder from '../assets/racing-thunder.jpg';
import medievalQuest from '../assets/medieval-quest.jpg';
import jungleRun from '../assets/jungle_run.jpg';

gsap.registerPlugin(ScrollTrigger);

const games = [
    { title: 'Space Blaster', image: spaceBlaster },
    { title: 'Cyber World', image: cyberWorld },
    { title: 'Puzzle Mania', image: puzzleMania },
    { title: 'Racing Thunder', image: racingThunder },
    { title: 'Medieval Quest', image: medievalQuest },
    { title: 'Jungle Run', image: jungleRun },
];

const GamesGallery = () => {
    useEffect(() => {
        ScrollTrigger.batch('.games-gallery-card', {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                });
            },
            start: 'top 85%',
            once: false,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleMouseMove = (e, index) => {
        const card = document.getElementById(`games-gallery-card-${index}`);
        const bounds = card.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const rotateX = ((y - bounds.height / 2) / 10).toFixed(2);
        const rotateY = ((x - bounds.width / 2) / 10).toFixed(2);

        gsap.to(card, {
            rotationX: -rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            transformOrigin: 'center',
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const resetRotation = (index) => {
        const card = document.getElementById(`games-gallery-card-${index}`);
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <section className="games-gallery-wrapper p-6 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">🎮 Games Gallery</h2>
            <div className="games-gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {games.map((game, index) => (
                    <div
                        key={index}
                        id={`games-gallery-card-${index}`}
                        className="games-gallery-card bg-white rounded-2xl shadow-xl overflow-hidden transform opacity-0 translate-y-10 transition-transform duration-300"
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => resetRotation(index)}
                    >
                        <img
                            src={game.image}
                            alt={game.title}
                            className="games-gallery-image w-full h-48 object-cover"
                        />
                        <div className="games-gallery-title p-4 text-center font-semibold text-gray-800">
                            {game.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GamesGallery;
