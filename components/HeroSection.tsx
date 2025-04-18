'use client'
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center bg-black overflow-hidden">
      {/* Main name display - positioned on the left */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-0">
      <div className={`z-10 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} md:ml-12 lg:ml-16`}>
        <p className="text-[100vw] md:text-[90vw] lg:text-[75vw] tracking-tighter text-blue-600 leading-none">
          AJ
        </p>
      </div>
      </div>

      {/* Social Media Icons - positioned at top right */}
      <div className="absolute mt-48 lg:mr-48 top-8 right-8 items-center space-x-6">
        <a href="https://github.com/a2jensen" target="_blank" rel="noopener noreferrer" 
           className={`text-white transition-all duration-1000 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a href="https://open.spotify.com/user/lvl40lilkap?si=007ef81476324c0e" target="_blank" rel="noopener noreferrer" 
           className={`text-white transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14.5c2.5-1 5.5-1 8 0"></path>
            <path d="M6.5 12c3.5-1 7.5-1 11 0"></path>
            <path d="M5 9.5c4-1 10-1 14 0"></path>
          </svg>
        </a>
        <a href="https://www.youtube.com/@aaangeloj" target="_blank" rel="noopener noreferrer" 
           className={`text-white transition-all duration-1000 delay-400 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        </a>
      </div>

      {/* Navigation links - centered at bottom */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-16 text-white sm:text-sm md:text-base lg:text-xl">
        <a href="#experience" className={`transition-all duration-1000 delay-400 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          experience
        </a>
        <a href="#project" className={`transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          projects
        </a>
        <a href="#dj" className={`transition-all duration-1000 delay-600 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          radio
        </a>
      </div>
    </div>
  );
};

export default HeroSection;