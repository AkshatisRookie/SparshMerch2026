import React, { useRef, useEffect, useState } from "react";

export const Navbar = ({
  activeSection,
  scrollToSection,
  sections,
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const buttonRefs = useRef({});
  const mobileNavRef = useRef(null);
  const mobileButtonRefs = useRef({});
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({});

  // Desktop indicator
  useEffect(() => {
    const activeButton = buttonRefs.current[activeSection];
    if (activeButton && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setIndicatorStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeSection]);

  // Mobile indicator
  useEffect(() => {
    const activeButton = mobileButtonRefs.current[activeSection];
    if (activeButton && mobileNavRef.current) {
      const navRect = mobileNavRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setMobileIndicatorStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeSection]);

  // Section icons mapping
  const getSectionIcon = (sectionId) => {
    const icons = {
      home: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      merch: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      about: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      contact: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      events: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gallery: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[sectionId] || icons.home;
  };

  return (
    <>
      {/* ==================== DESKTOP NAVBAR ==================== */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out hidden md:block"
        style={{
          width: "min(90%, 850px)"
        }}
      >
        {/* Arabian Nights themed container with lamp-inspired shape */}
        <div className="relative backdrop-blur-xl shadow-2xl overflow-visible" 
          style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(75, 0, 130, 0.25) 50%, rgba(25, 25, 112, 0.3) 100%)',
            borderRadius: '60px 60px 50px 50px',
            border: '2px solid rgba(255, 215, 0, 0.3)',
          }}
        >
          {/* Mystical glow effects */}
          <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '60px 60px 50px 50px' }}>
            <div className="absolute -top-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-br from-purple-600/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-full bg-gradient-to-tl from-indigo-600/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-full blur-2xl" />
          </div>

          <div className="relative flex items-center justify-between px-6 py-4">
            {/* Logo - Left side */}
            <div
              className="transition-all duration-500 ease-out overflow-hidden"
              style={{
                width: "150px",
                opacity: 1
              }}
            >
              <img
                src="./logo.png"
                alt="Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              />
            </div>

            {/* Navigation Links */}
            <div ref={navRef} className="relative flex items-center gap-1 md:gap-2 mx-auto">
              {/* Sliding indicator background */}
              <span
                className="absolute transition-all duration-300 ease-out overflow-hidden"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  height: '100%',
                  top: 0,
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                  borderRadius: '25px',
                  border: '1px solid rgba(255, 215, 0, 0.5)',
                }}
              >
                {/* Sparkle effects */}
                <span className="absolute inset-0 opacity-50">
                  <span className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_4px_#fff]" style={{ animationDelay: '0s' }} />
                  <span className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_4px_#fff]" style={{ animationDelay: '0.3s' }} />
                  <span className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_4px_#fff]" style={{ animationDelay: '0.6s' }} />
                  <span className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_4px_#fff]" style={{ animationDelay: '0.9s' }} />
                </span>
              </span>
              
              {sections.map((section) => (
                <button
                  key={section.id}
                  ref={(el) => (buttonRefs.current[section.id] = el)}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-4 md:px-6 py-2 text-sm md:text-base font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? "text-black font-semibold"
                      : "text-amber-100/90 hover:text-amber-50"
                  }`}
                  style={{
                    textShadow: activeSection === section.id ? 'none' : '0 0 10px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <span className="relative z-10">{section.label}</span>
                </button>
              ))}
            </div>

            {/* Genie - Right side */}
            <div
              className="transition-all duration-500 ease-out overflow-hidden relative"
              style={{
                width: "80px",
                opacity: 1,
              }}
            >
              <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-purple-500/40 via-blue-500/30 to-transparent blur-xl rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
              <img
                src="./genie.png"
                alt="Genie"
                className="relative h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== MOBILE TOP HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div 
          className="flex items-center justify-between px-4 py-3 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.4) 0%, rgba(75, 0, 130, 0.35) 50%, rgba(25, 25, 112, 0.4) 100%)',
            borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
          }}
        >
          {/* Logo */}
          <img
            src="./logo.png"
            alt="Logo"
            className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
          />

          {/* Title */}
          <h1 
            className="text-lg font-bold text-amber-100"
            style={{
              textShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
            }}
          >
            SPARSH 2026
          </h1>

          {/* Genie */}
          <div className="relative">
            <div className="absolute inset-0 w-full h-full bg-purple-500/30 blur-lg rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
            <img
              src="./genie.png"
              alt="Genie"
              className="relative h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(138,43,226,0.6)]"
            />
          </div>
        </div>
      </header>

      {/* ==================== MOBILE BOTTOM TAB BAR ==================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
        <div 
          className="relative backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.5) 0%, rgba(75, 0, 130, 0.4) 50%, rgba(25, 25, 112, 0.5) 100%)',
            borderTop: '1px solid rgba(255, 215, 0, 0.3)',
          }}
        >
          {/* Mystical glow effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-amber-500/20 to-transparent blur-xl" />
          </div>

          <div 
            ref={mobileNavRef} 
            className="relative flex items-center justify-around px-2 py-2"
          >
            {/* Sliding indicator */}
            <span
              className="absolute transition-all duration-300 ease-out"
              style={{
                left: `${mobileIndicatorStyle.left}px`,
                width: `${mobileIndicatorStyle.width}px`,
                height: '48px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 215, 0, 0.5)',
              }}
            >
              {/* Sparkle effects */}
              <span className="absolute inset-0 opacity-50">
                <span className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_3px_#fff]" />
                <span className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_3px_#fff]" style={{ animationDelay: '0.5s' }} />
              </span>
            </span>

            {sections.map((section) => (
              <button
                key={section.id}
                ref={(el) => (mobileButtonRefs.current[section.id] = el)}
                onClick={() => scrollToSection(section.id)}
                className={`relative flex flex-col items-center justify-center px-3 py-2 min-w-[60px] transition-all duration-300 ${
                  activeSection === section.id
                    ? "text-black"
                    : "text-amber-100/80"
                }`}
              >
                <span className={`relative z-10 transition-transform duration-300 ${
                  activeSection === section.id ? 'scale-110' : ''
                }`}>
                  {getSectionIcon(section.id)}
                </span>
                <span 
                  className={`relative z-10 text-[10px] mt-1 font-medium transition-all duration-300 ${
                    activeSection === section.id ? 'font-semibold' : ''
                  }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </div>

          {/* Safe area spacer for iOS */}
          <div className="h-safe-area-bottom" />
        </div>
      </nav>

      {/* Add padding to body for mobile bottom nav */}
      <style jsx global>{`
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: env(safe-area-inset-bottom);
          }
          .h-safe-area-bottom {
            height: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
