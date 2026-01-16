"use client";

import { useState } from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";

const GlassCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative w-full max-w-[320px] sm:w-80 overflow-visible transition-all duration-500 ease-out cursor-pointer group"
        style={{
          borderRadius: '35px 35px 25px 25px',
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.18) 0%, rgba(75, 0, 130, 0.15) 50%, rgba(25, 25, 112, 0.18) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 215, 0, 0.2)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Floating lantern decoration - top left */}
        <div 
          className="absolute -top-6 -left-4 w-8 h-10 opacity-70 transition-all duration-700 z-10"
          style={{
            transform: isHovered ? 'translateY(-5px) rotate(-5deg)' : 'translateY(0) rotate(0deg)',
          }}
        >
          <div className="relative w-full h-full">
            {/* Lantern top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-b from-amber-600/60 to-amber-700/40 rounded-t-lg border border-amber-500/40" />
            {/* Lantern body */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-sm border border-amber-400/30 backdrop-blur-sm">
              <div className="absolute inset-1 bg-yellow-300/20 rounded-sm animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
            {/* Lantern bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-t from-amber-700/40 to-amber-600/30 rounded-b-md border-b border-x border-amber-500/30" />
          </div>
        </div>

        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ borderRadius: '35px 35px 25px 25px' }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="arabesque" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="rgba(255, 215, 0, 0.8)"/>
                <path d="M20 10 Q25 15 20 20 Q15 15 20 10" stroke="rgba(255, 215, 0, 0.6)" fill="none" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arabesque)"/>
          </svg>
        </div>
        
        {/* Decorative corner flourishes */}
        <div className="absolute top-4 left-4 w-3 h-3 z-10 transition-all duration-300" style={{ opacity: isHovered ? 1 : 0.6 }}>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent" />
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-400/60 to-transparent" />
          <div className="absolute top-0 left-0 w-1 h-1 rounded-full bg-amber-400/80 shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
        </div>
        <div className="absolute top-4 right-4 w-3 h-3 z-10 transition-all duration-300" style={{ opacity: isHovered ? 1 : 0.6 }}>
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-400/60 to-transparent" />
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-amber-400/60 to-transparent" />
          <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-amber-400/80 shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
        </div>


        {/* Product Image with mystical glow */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-3xl">
          {/* Subtle gradient overlay - minimal */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />
          
          {/* Animated shimmer effect on hover */}
          <div 
            className="absolute inset-0 z-10 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.3 : 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
            }}
          />
          
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700"
            style={{
              transform: isHovered ? 'scale(1.08) rotate(1deg)' : 'scale(1) rotate(0deg)',
              filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
            }}
          />

          {/* View Details - Desktop only */}
          <div
            className={`absolute inset-0 items-center justify-center z-20 transition-all duration-300 hidden sm:flex ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-amber-600/50 to-purple-600/50 backdrop-blur-sm rounded-full text-amber-50 text-sm font-medium border border-amber-400/30 shadow-[0_0_15px_rgba(255,215,0,0.4)]">
              View Details
            </span>
          </div>

          {/* Mobile tap indicator */}
          <div className="absolute bottom-2 right-2 z-20 sm:hidden">
            <span className="px-2 py-1 bg-amber-900/40 backdrop-blur-sm rounded-full text-amber-200/80 text-[10px] border border-amber-400/20">
              Tap for details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-amber-300/70 uppercase tracking-wider mb-1">
            {product.category}
          </p>

          <h3 className="text-base sm:text-lg font-semibold text-amber-50 mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-amber-100 transition-colors">
            {product.name}
          </h3>

          <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Sizes Preview */}
          {product.sizes && (
            <div className="flex gap-1 sm:gap-1.5 mb-3 sm:mb-4 flex-wrap">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded bg-amber-900/20 text-amber-200/80 border border-amber-400/20"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded bg-amber-900/20 text-amber-200/80 border border-amber-400/20">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price & Buy Now */}
          <div className="flex items-center justify-between pt-3 border-t border-amber-400/10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold text-amber-100">
                ₹{product.price}
              </span>
            </div>

            <button
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs sm:text-sm font-semibold transition-all duration-300 hover:from-amber-400 hover:to-amber-500 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        
        {/* Bottom decorative corners */}
        <div className="absolute bottom-2 left-3 w-2 h-2 border-l-2 border-b-2 border-amber-400/40 rounded-bl-md" />
        <div className="absolute bottom-2 right-3 w-2 h-2 border-r-2 border-b-2 border-amber-400/40 rounded-br-md" />
      </div>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GlassCard;
