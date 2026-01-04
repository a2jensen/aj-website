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
      {/* Main name display - positioned conditionally */}
    <div className="absolute inset-0 flex items-start md:items-center justify-start md:justify-center pointer-events-none z-0">
      <div
        className={`z-10 transition-all duration-1000 transform ${
          loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ml-4 md:ml-12 lg:ml-16`}
      >
        <p className="text-[85vw] md:text-[90vw] lg:text-[85vw] tracking-tighter text-blue-600 leading-none">
          AJ
        </p>
      </div>
    </div>


      {/* Social Media Icons - positioned at top right */}
      <div className="absolute mt-48 lg:mr-48 top-8 right-8 items-center space-x-6">
        <a href="https://github.com/a2jensen" target="_blank" rel="noopener noreferrer" 
           className={`text-white transition-all duration-1000 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a href="https://open.spotify.com/user/lvl40lilkap?si=007ef81476324c0e" target="_blank" rel="noopener noreferrer" 
           className={`text-white transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14.5c2.5-1 5.5-1 8 0"></path>
            <path d="M6.5 12c3.5-1 7.5-1 11 0"></path>
            <path d="M5 9.5c4-1 10-1 14 0"></path>
          </svg>
        </a>
      </div>

      {/* Navigation links - centered at bottom */}
      <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-x-16 md:space-y-0 text-white text-5xl sm:text-5xl md:text-base lg:text-5xl">
      <a
        href="#experience"
        className={`transition-all duration-1000 delay-400 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} -translate-x-16 md:translate-x-0`}
      >
        experience
      </a>
      <a
        href="#project"
        className={`transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} translate-x-12 md:translate-x-0`}
      >
        projects
      </a>
      <a
        href="#dj"
        className={`transition-all duration-1000 delay-600 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} -translate-x-8 md:translate-x-0`}
      >
        radio
      </a>
    </div>

    </div>
  );
};

export default HeroSection;
