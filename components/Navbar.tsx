'use client'
import { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black text-white py-4' : 'bg-transparent text-white py-6'}`}> 
            <div className="container mx-auto px-8">
                <div className="flex justify-between items-center">
                    <ul className="flex space-x-8 font-medium">
                        <li>
                            <a href="#about" className="hover:opacity-70 transition">about</a>
                        </li>
                        <li>
                            <a href="#experience" className="hover:opacity-70 transition">experience</a>
                        </li>
                        <li>
                            <a href="#projects" className="hover:opacity-70 transition">projects</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;