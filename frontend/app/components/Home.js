import React, { useEffect, useState, useRef } from "react";

export const Home = ({ scrollToSection }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); */

  // Generate twinkling stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 70}%`,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  // Shooting stars
  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 4 + Math.random() * 2,
    duration: 1.5,
    top: `${10 + Math.random() * 30}%`,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ paddingTop: '60px', paddingBottom: '80px' }}
    >
      {/* ==================== BACKGROUND ==================== */}
      
      {/* Base gradient - Deep night sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(88, 28, 135, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(49, 46, 129, 0.3) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 80%, rgba(91, 33, 182, 0.2) 0%, transparent 40%),
            linear-gradient(180deg, #0f0a1e 0%, #1a0d2e 30%, #0d0620 70%, #050208 100%)
          `,
        }}
      />

      {/* Animated aurora/mist effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-aurora"
          style={{
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 30%, rgba(217, 119, 6, 0.05) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* ==================== STARS ==================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: 'white',
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              boxShadow: star.size > 1.5 ? `0 0 ${star.size * 2}px rgba(255,255,255,0.5)` : 'none',
            }}
          />
        ))}
      </div>

      {/* ==================== SHOOTING STARS ==================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              top: star.top,
              right: '-10%',
              animation: `shootingStar ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          >
            <div
              className="w-24 sm:w-32 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
                boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ==================== MAGIC LAMP WITH GLOW ==================== */}
      <div
        className="absolute bottom-[15%] left-[5%] sm:left-[10%] w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 z-10"
        style={{
          animation: 'float 5s ease-in-out infinite',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        {/* Lamp glow */}
        <div
          className="absolute -inset-4 sm:-inset-6 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255,200,50,0.3) 0%, transparent 70%)',
            animationDuration: '2s',
          }}
        />
        
        {/* Magic particles from lamp */}
        <div className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 w-16 sm:w-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
              style={{
                left: `${30 + Math.random() * 40}%`,
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                boxShadow: '0 0 4px #fbbf24',
                animation: `magicParticle ${2 + Math.random()}s ease-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Lamp image placeholder - replace with actual lamp image */}
        <div className="relative w-full h-full">
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="lampGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="30%" stopColor="#f59e0b" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="lampHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
            </defs>
            {/* Lamp base */}
            <ellipse cx="50" cy="65" rx="28" ry="12" fill="url(#lampGold)" />
            {/* Lamp body */}
            <path d="M25,60 Q25,45 50,40 Q75,45 75,60 L72,65 L28,65 Z" fill="url(#lampGold)" />
            {/* Lamp top */}
            <ellipse cx="50" cy="40" rx="12" ry="5" fill="url(#lampHighlight)" />
            <path d="M42,40 Q50,30 58,40" fill="url(#lampHighlight)" stroke="url(#lampGold)" strokeWidth="1" />
            {/* Spout */}
            <path d="M72,55 Q88,48 92,38 L89,36 Q85,44 70,52" fill="url(#lampGold)" />
            {/* Handle */}
            <path d="M28,55 Q12,48 15,38" fill="none" stroke="url(#lampGold)" strokeWidth="5" strokeLinecap="round" />
            {/* Shine */}
            <ellipse cx="40" cy="52" rx="6" ry="3" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
      </div>

      {/* ==================== FLYING CARPET ==================== */}
      <div
        className="absolute bottom-[12%] right-[3%] sm:right-[8%] w-24 sm:w-36 md:w-44 z-10"
        style={{
          animation: 'carpetFloat 4s ease-in-out infinite',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        {/* Carpet sparkle trail */}
        <div className="absolute -left-4 top-1/2 flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400"
              style={{
                animation: `sparkleTrail 1s ease-out ${i * 0.15}s infinite`,
                opacity: 0.8 - i * 0.2,
              }}
            />
          ))}
        </div>

        <svg viewBox="0 0 180 60" className="w-full drop-shadow-xl">
          <defs>
            <linearGradient id="carpetRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="30%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="70%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="carpetGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Carpet body with wave */}
          <path
            d="M5,35 Q45,15 90,35 Q135,55 175,35 L170,42 Q135,62 90,42 Q45,22 10,42 Z"
            fill="url(#carpetRed)"
          />
          {/* Gold border pattern */}
          <path
            d="M12,37 Q48,19 90,37 Q132,55 168,37"
            fill="none"
            stroke="url(#carpetGold)"
            strokeWidth="2"
          />
          {/* Inner pattern */}
          <path
            d="M25,37 Q55,23 90,37 Q125,51 155,37"
            fill="none"
            stroke="url(#carpetGold)"
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Diamond patterns */}
          {[40, 90, 140].map((x, i) => (
            <path
              key={i}
              d={`M${x},${35 + (i === 1 ? 0 : 5)} l4,-4 l4,4 l-4,4 z`}
              fill="#fbbf24"
              opacity="0.8"
            />
          ))}
          {/* Tassels */}
          <g className="animate-tassel">
            {[8, 14, 20].map((x, i) => (
              <line key={`left-${i}`} x1={x} y1="40" x2={x - 3} y2="55" stroke="#fbbf24" strokeWidth="1.5" />
            ))}
            {[160, 166, 172].map((x, i) => (
              <line key={`right-${i}`} x1={x} y1="40" x2={x + 3} y2="55" stroke="#fbbf24" strokeWidth="1.5" />
            ))}
          </g>
        </svg>
      </div>

      {/* ==================== ARABIAN CITY SILHOUETTE ==================== */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 pointer-events-none">
        <svg
          viewBox="0 0 1440 160"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="cityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(88, 28, 135, 0.6)" />
              <stop offset="50%" stopColor="rgba(49, 10, 94, 0.8)" />
              <stop offset="100%" stopColor="rgba(15, 5, 30, 0.95)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#cityGradient)"
            d="M0,160 L0,120
               L30,120 L30,100 Q30,85 45,85 Q60,85 60,100 L60,120
               L100,120 L100,80 L105,80 L105,60 Q105,50 115,50 Q125,50 125,60 L125,80 L130,80 L130,120
               L180,120 L180,90 Q180,75 200,75 Q220,75 220,90 L220,120
               L280,120 L280,70 Q280,50 300,50 L300,45 Q300,30 320,30 Q340,30 340,45 L340,50 Q360,50 360,70 L360,120
               L420,120 L420,100 L430,100 L430,85 Q430,75 440,75 Q450,75 450,85 L450,100 L460,100 L460,120
               L520,120 L520,60 Q520,40 550,40 Q580,40 580,60 L580,120
               L660,120 L660,90 L670,90 L670,70 Q670,55 690,55 Q710,55 710,70 L710,90 L720,90 L720,120
               L800,120 L800,50 Q800,25 840,25 Q880,25 880,50 L880,120
               L960,120 L960,80 Q960,60 990,60 Q1020,60 1020,80 L1020,120
               L1100,120 L1100,70 L1110,70 L1110,50 Q1110,35 1130,35 Q1150,35 1150,50 L1150,70 L1160,70 L1160,120
               L1220,120 L1220,90 Q1220,70 1250,70 Q1280,70 1280,90 L1280,120
               L1340,120 L1340,100 Q1340,85 1360,85 Q1380,85 1380,100 L1380,120
               L1440,120 L1440,160 Z"
          />
          {/* Window lights */}
          {[
            [115, 65], [320, 40], [550, 55], [690, 65], [840, 40], [1130, 50], [1250, 80]
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x - 3}
              y={y + 5}
              width="6"
              height="8"
              fill="#fbbf24"
              opacity="0.6"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
            />
          ))}
        </svg>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        
        {/* Pre-title badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 mb-4 sm:mb-6 lg:mt-15 rounded-full transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 119, 6, 0.15))',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-200/90 text-xs sm:text-sm font-medium tracking-wide">
            ✨ SVNIT Surat Presents ✨
          </span>
        </div>

        {/* Main Title */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide mb-2 sm:mb-3"
            style={{
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              background: 'linear-gradient(180deg, #fef3c7 0%, #fcd34d 30%, #f59e0b 60%, #d97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.4))',
              textShadow: '0 0 40px rgba(251, 191, 36, 0.3)',
            }}
          >
            SPARSH
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-500/60" />
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>

          {/* Year */}
          <p
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            2026
          </p>
        </div>

        {/* Theme section */}
        <div
          className={`mb-6 sm:mb-8 transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-200/50 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2">
            This Year&apos;s Theme
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
            style={{
              background: 'linear-gradient(135deg, #e879f9, #a78bfa, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 10px rgba(168, 139, 250, 0.4))',
            }}
          >
            ✦ A Whole New World ✦
          </h2>
          <p className="text-purple-300/70 text-sm sm:text-base italic">
            ~ Inspired by Aladdin ~
          </p>
        </div>

        {/* Description */}
        <p
          className={`text-sm sm:text-base md:text-lg text-amber-100/60 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Step into the magical world of Arabian nights! Get your hands on
          <span className="text-amber-300 font-medium"> exclusive limited edition merchandise </span>
          featuring enchanting designs inspired by the tales of Aladdin.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Primary Button */}
          <button
            onClick={() => scrollToSection && scrollToSection('merch')}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)',
              color: '#1a0d2e',
            }}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Explore Merch
            </span>
          </button>
        </div>
      </div>

      {/* ==================== SCROLL INDICATOR ==================== */}
      <div
        className={`absolute bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-amber-200/40 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-amber-500/30 flex justify-center pt-1.5">
          <div
            className="w-1 h-2 rounded-full bg-amber-400/60"
            style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* ==================== ANIMATIONS ==================== */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(-120vw) translateY(50vh);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-3deg);
          }
          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }

        @keyframes carpetFloat {
          0%, 100% {
            transform: translateY(0) rotate(-1deg) skewX(-2deg);
          }
          50% {
            transform: translateY(-18px) rotate(1deg) skewX(2deg);
          }
        }

        @keyframes magicParticle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
          }
        }

        @keyframes sparkleTrail {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.5);
          }
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(4px);
            opacity: 1;
          }
        }

        @keyframes aurora {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
        }

        .animate-aurora {
          animation: aurora 30s linear infinite;
        }

        .animate-tassel {
          animation: tassel 0.6s ease-in-out infinite;
        }

        @keyframes tassel {
          0%, 100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Home;