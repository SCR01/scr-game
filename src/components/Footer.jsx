import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaGlobe,
	FaEnvelope,
} from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
	{
		href: 'https://www.linkedin.com/in/sharad-chandra-reddy-b0737a231/',
		icon: <FaLinkedin />,
	},
	{ href: 'https://github.com/SCR01', icon: <FaGithub /> },
	{ href: 'https://portfolio-scr.vercel.app/', icon: <FaGlobe /> },
	{ href: 'https://x.com/home', icon: <FaTwitter /> },
	{ href: 'mailto:scr.contact@email.com', icon: <FaEnvelope /> },
]

const Footer = () => {
	const footerRef = useRef(null)
	const [showGitHubStar, setShowGitHubStar] = useState(false)

	useEffect(() => {
		requestAnimationFrame(() => {
			gsap.fromTo(
				footerRef.current,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: footerRef.current,
						start: 'top 85%',
						once: true,
					},
				}
			)
		})
		// Delay showing GitHub star button for smoother performance
		const timer = setTimeout(() => setShowGitHubStar(true), 500)
		return () => clearTimeout(timer)
	}, [])

	return (
		<footer
			ref={footerRef}
			className='w-full bg-[#0f0f1c] text-white py-10 px-6 md:px-16'
		>
			<div className='container mx-auto grid gap-10 md:grid-cols-3 items-end'>
				{/* Logo and Tagline */}
				<div className='flex flex-col items-start gap-3'>
					<div className='flex items-center gap-3'>
						<img
							src='/img/logo.png'
							alt='SCR Logo'
							className='w-10 h-10'
							loading='lazy'
						/>
						<span className='text-2xl font-semibold'>SCR Gaming</span>
					</div>
					<p className='text-sm text-gray-400'>
						Made with ❤️ using React, GSAP & Tailwind CSS
					</p>
				</div>

				{/* Social Icons + GitHub Star */}
				<div className='flex flex-col items-center gap-4'>
					<p className='text-sm text-gray-400'>Connect with us:</p>
					<div className='flex gap-5 text-2xl'>
						{socialLinks.map((link, index) => (
							<a
								key={index}
								href={link.href}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-blue-400 transition-colors duration-300'
							>
								{link.icon}
							</a>
						))}
					</div>
					{/* GitHub Star Button (rendered after mount) */}
					{showGitHubStar && (
						<a
							href='https://github.com/SCR01/scr-game'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-lg font-semibold shadow hover:bg-yellow-300 transition'
						>
							⭐ Star on GitHub
						</a>
					)}
				</div>

				{/* Right Text Column */}
				<div className=' flex flex-col items-end  text-right gap-2'>
					<a href='#privacy-policy' className='text-gray-400 hover:underline'>
						Privacy Policy
					</a>
					<p className='text-gray-400 '>
						© 2025 SCR Gaming. All rights reserved.
					</p>
					{showGitHubStar && (
						<a
							href='https://github.com/SCR01/scr-game'
							target='_blank'
							rel='noopener noreferrer'
							className='  inline-flex items-center gap-2 bg-neutral-800 text-zinc-100 px-4 py-1.5 rounded-lg font-semibold shadow hover:bg-neutral-700 transition'
						>
							⭐ Star on GitHub
						</a>
					)}
				</div>
			</div>
		</footer>
	)
}

export default Footer
