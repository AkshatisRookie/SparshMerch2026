import React from "react";

const Credits = () => {
  const developers = [
    {
      name: "Akshat Seth",
      rollNo: "U23EE101",
      phone: "+91 80520 21832",
      role: "Backend Developer",
      linkedin: "https://www.linkedin.com/in/akshatsethh", // optional
      github: "https://github.com/AkshatisRookie", // optional
    },
    {
      name: "Aayush Jha",
      rollNo: "U23AI032",
      phone: "+91 81151 83503",
      role: "Backend Developer",
      linkedin: "https://www.linkedin.com/in/aayush4jha", // optional
      github: "https://github.com/aayush4jha", // optional
    },
    {
      name: "Aryan Jain",
      rollNo: "U24AI069",
      phone: "+91 86025 68588",
      role: "UI/UX Designer",
      linkedin: "https://www.linkedin.com/in/codaryan",
      github: "https://github.com/cod-aryan",
    },
    {
      name: "Aayush Prasad",
      rollNo: "U24AI091",
      phone: "+91 93287 88481",
      role: "UI/UX Designer",
      linkedin: "https://www.linkedin.com/in/aayush-droid",
      github: "https://github.com/aayush-decoder",
    },
    {
      name: "Bhaskar Sahu",
      rollNo: "I24AI029",
      phone: "+91 78794 24006",
      role: "UI/UX Designer",
      linkedin: "https://www.linkedin.com/in/bhaskar-sahu-4489a229b/",
      github: "https://github.com/bhscodz",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0620] via-[#0a0318] to-[#050208]" />

      {/* Decorative Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-12 md:mb-0">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          {/* Decorative lamp icon */}
          <div className="flex justify-center mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-lg animate-pulse" />
              <svg viewBox="0 0 40 35" className="w-full h-full">
                <defs>
                  <linearGradient id="creditLampGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                <ellipse cx="20" cy="28" rx="12" ry="5" fill="url(#creditLampGold)" />
                <path d="M10,26 Q10,18 20,15 Q30,18 30,26" fill="url(#creditLampGold)" />
                <ellipse cx="20" cy="15" rx="5" ry="2" fill="#fef3c7" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 mb-2">
            Crafted with ✨ by
          </h2>
          <p className="text-amber-100/40 text-xs sm:text-sm">
            The team behind this magical experience
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/40" />
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(217, 119, 6, 0.05))",
                border: "1px solid rgba(251, 191, 36, 0.15)",
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-lg sm:text-xl">
                  {dev.name.charAt(0)}
                </div>

                {/* Name */}
                <h3 className="text-amber-100 font-semibold text-base sm:text-lg text-center mb-1">
                  {dev.name}
                </h3>

                {/* Role */}
                {dev.role && (
                  <p className="text-amber-400/70 text-xs text-center mb-3">
                    {dev.role}
                  </p>
                )}

                {/* Details */}
                <div className="space-y-2">
                  {/* Roll Number */}
                  <div className="flex items-center justify-center gap-2 text-amber-100/60 text-xs sm:text-sm">
                    <svg className="w-3.5 h-3.5 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <span>{dev.rollNo}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-center gap-2 text-amber-100/60 text-xs sm:text-sm">
                    <svg className="w-3.5 h-3.5 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a 
                      href={`tel:${dev.phone.replace(/\s/g, '')}`}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {dev.phone}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                {(dev.linkedin || dev.github) && (
                  <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-amber-500/10">
                    {dev.linkedin && (
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-100/50 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {dev.github && (
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-100/50 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 sm:mt-10 pt-6 border-t border-amber-500/10">
          <p className="text-amber-100/30 text-xs sm:text-sm mb-2">
            Made with 💜 for Sparsh 2026 - SVNIT Surat
          </p>
          <p className="text-amber-100/20 text-[10px] sm:text-xs">
            © {new Date().getFullYear()} Sparsh Cultural Committee. All rights reserved.
          </p>
        </div>
      </div>

      {/* Twinkle animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};

export default Credits;