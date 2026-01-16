"use client";

import React, { useState } from "react";

export const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="text-center max-w-5xl relative">
      {/* Decorative elements */}
      <div className="absolute -top-10 left-[10%] w-6 h-6 opacity-20 animate-twinkle">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(251, 191, 36, 0.6)" stroke="rgba(251, 191, 36, 0.8)" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute -top-5 right-[15%] w-5 h-5 opacity-15 animate-twinkle" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(251, 191, 36, 0.5)" stroke="rgba(251, 191, 36, 0.7)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex justify-center mb-3">
          <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="opacity-40">
            <path d="M0 10 Q20 5 40 10 Q60 15 80 10" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="1" fill="none"/>
            <circle cx="40" cy="10" r="2" fill="rgba(251, 191, 36, 0.8)"/>
          </svg>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 relative inline-block">
          <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
            Contact Us
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-full" />
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base mt-6 max-w-2xl mx-auto">
          Have questions about our merchandise? Need help with your order? We're here to assist you.
        </p>

        <div className="flex justify-center mt-4">
          <svg width="100" height="20" viewBox="0 0 100 20" fill="none" className="opacity-30">
            <path d="M10 10 L30 10 M70 10 L90 10" stroke="rgba(251, 191, 36, 0.5)" strokeWidth="1"/>
            <circle cx="50" cy="10" r="3" fill="none" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="1"/>
            <circle cx="50" cy="10" r="1.5" fill="rgba(251, 191, 36, 0.7)"/>
          </svg>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
{/* Instagram Card */}
<div 
  className="p-8 sm:p-10 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
  style={{
    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(75, 0, 130, 0.15) 50%, rgba(25, 25, 112, 0.2) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1.5px solid rgba(255, 215, 0, 0.2)',
  }}
  onMouseEnter={() => setHoveredCard('instagram')}
  onMouseLeave={() => setHoveredCard(null)}
>
  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 flex items-center justify-center relative">
    {/* Circular box */}
    <div 
      className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-500 ${hoveredCard === 'instagram' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(225, 48, 108, 0.2), rgba(131, 58, 180, 0.2))',
        border: '1.5px solid rgba(225, 48, 108, 0.4)',
      }}
    >
      {/* Instagram Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-10 w-10"
        viewBox="0 0 24 24" 
        fill="none"
      >
        <defs>
          <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#FCAF45" />
            <stop offset="50%" stopColor="#F77737" />
            <stop offset="75%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#instagramGradient)" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="4" stroke="url(#instagramGradient)" strokeWidth="2" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="url(#instagramGradient)"/>
      </svg>
    </div>
    {/* Genie Image */}
    <img 
      src="./genie.png" 
      alt="Genie" 
      className={`w-full h-full object-contain transition-all duration-500 absolute drop-shadow-[0_0_15px_rgba(138,43,226,0.6)] ${hoveredCard === 'instagram' ? 'opacity-100 scale-110 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`}
    />
  </div>
  <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-3">Follow Us</h3>
  <p className="text-slate-400 text-sm sm:text-base mb-4">Stay updated on Instagram</p>
  <a 
    href="https://instagram.com/sparsh.nitsurat" 
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 hover:from-amber-200 hover:via-pink-300 hover:to-purple-300 transition-all text-base sm:text-lg font-medium"
  >
    @sparsh.nitsurat
    <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
</div>

        {/* Call Us Card */}
        <div 
          className="p-8 sm:p-10 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(75, 0, 130, 0.15) 50%, rgba(25, 25, 112, 0.2) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 215, 0, 0.2)',
          }}
          onMouseEnter={() => setHoveredCard('call')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 flex items-center justify-center relative">
            {/* Circular box */}
            <div 
              className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-500 ${hoveredCard === 'call' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
                border: '1.5px solid rgba(255, 215, 0, 0.3)',
              }}
            >
              {/* Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-amber-400"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            {/* Camel Image */}
            <img 
              src="./camelMascot.png" 
              alt="Camel" 
              className={`w-full h-full object-contain transition-all duration-500 absolute drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] ${hoveredCard === 'call' ? 'opacity-100 scale-110 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`}
            />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-3">Call Us</h3>
          <p className="text-slate-400 text-sm sm:text-base mb-4">Available 9 AM - 6 PM</p>
          <a href="tel:+919939575180" className="text-amber-300 hover:text-amber-200 transition-colors text-base sm:text-lg font-medium">
            +91 99395 75180
          </a>
        </div>

        {/* Visit Us Card */}
        <div 
          className="p-8 sm:p-10 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:col-span-2 lg:col-span-1 group"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(75, 0, 130, 0.15) 50%, rgba(25, 25, 112, 0.2) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 215, 0, 0.2)',
          }}
          onMouseEnter={() => setHoveredCard('visit')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 flex items-center justify-center relative">
            {/* Circular box */}
            <div 
              className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-500 ${hoveredCard === 'visit' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
                border: '1.5px solid rgba(255, 215, 0, 0.3)',
              }}
            >
              {/* Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-amber-400"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {/* Aladdin Image */}
            <img 
              src="./aladin.png" 
              alt="Aladdin" 
              className={`w-full h-full object-contain transition-all duration-500 absolute drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] ${hoveredCard === 'visit' ? 'opacity-100 scale-110 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`}
            />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-3">Visit Us</h3>
          <p className="text-slate-400 text-sm sm:text-base mb-4">Merchandise Counter</p>
          <p className="text-amber-300 text-base sm:text-lg font-medium">
            SVNIT Campus
          </p>
        </div>
      </div>
    </div>
  );
};
