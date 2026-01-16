import React, { useState } from "react";
import Image from "next/image";
import OrderModal from "./OrderModal";

export const MerchSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tshirt = {
    name: "Sparsh 2026 Official Tee",
    category: "Official T-Shirt",
    description: "Limited edition T-shirt with exclusive Aladdin theme design. 100% Premium Cotton with oversized comfortable fit.",
    images: [
      "/images/4_20260114_223649_0000.png",
      "/images/5_20260114_223649_0001.png",
      "/images/T-Shirt Poster_20260116_152359_0000.png",
    ],
    image: "/images/4_20260114_223649_0000.png", // Fallback image
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", value: "#1a1a2e" },
      { name: "Navy", value: "#0f3460" },
      { name: "White", value: "#f0f0f0" },
    ],
    price: 309,
    nonCommitteePrice: 309,
    committeePrice: 279,
    badge: "Limited Edition",
    features: [
      "100% Premium Cotton",
      "Exclusive Aladdin Theme Design",
      "Oversized Comfortable Fit",
      "Limited Edition",
    ],
  };

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0620] via-[#120a24] to-[#0d0620]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          {/* Decorative lamp */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
              <svg viewBox="0 0 60 50" className="w-full h-full">
                <defs>
                  <linearGradient id="lampGoldMerch" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                <ellipse cx="30" cy="40" rx="18" ry="8" fill="url(#lampGoldMerch)" />
                <path d="M15,38 Q15,28 30,25 Q45,28 45,38" fill="url(#lampGoldMerch)" />
                <ellipse cx="30" cy="25" rx="8" ry="3" fill="#fef3c7" />
                <path d="M45,34 Q55,30 58,22" fill="none" stroke="url(#lampGoldMerch)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(180deg, #fef3c7 0%, #fcd34d 50%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Official Merchandise
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50" />
            <div className="w-2 h-2 rotate-45 bg-amber-500/50" />
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          <p className="text-amber-100/50 text-sm sm:text-base max-w-md mx-auto">
            Limited edition T-shirt with exclusive Aladdin theme design
          </p>
        </div>

        {/* Product Display */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            {/* Main Image Container */}
            <div
              className="relative aspect-[4/5] max-w-sm mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(217, 119, 6, 0.1))",
                border: "1px solid rgba(251, 191, 36, 0.2)",
              }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-b from-amber-500/10 via-purple-500/10 to-amber-500/10 blur-2xl rounded-full" />

              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={tshirt.images[currentImageIndex]}
                  alt={tshirt.name}
                  fill
                  className="object-cover"
                />

              </div>
              
            </div>
     <div className="flex justify-center gap-2 sm:gap-3 mt-4">
              {tshirt.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                    currentImageIndex === index
                      ? "ring-2 ring-amber-500 scale-105"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Decorative Genie */}
            <div className="absolute -left-8 top-1/4 w-20 h-28 hidden lg:block opacity-60">
              <img
                src="./genie.png"
                alt="Genie"
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(138,43,226,0.5)]"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="text-center lg:text-left">
            {/* Category */}
            <span className="text-amber-400/70 text-xs sm:text-sm tracking-[0.2em] uppercase">
              Official T-Shirt
            </span>

            {/* Title */}
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3 sm:mb-4"
              style={{
                background: "linear-gradient(135deg, #fef3c7, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {tshirt.name}
            </h3>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
              {tshirt.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs sm:text-sm text-amber-100/70"
                >
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="text-amber-100/80 text-sm">Select Size:</span>
                {selectedSize && (
                  <span className="text-amber-400 text-sm font-semibold">{selectedSize}</span>
                )}
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {tshirt.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-gradient-to-br from-amber-400 to-amber-600 text-black scale-105 shadow-lg shadow-amber-500/30"
                        : "bg-white/5 text-amber-100/70 border border-amber-500/20 hover:border-amber-500/50 hover:bg-white/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(139, 92, 246, 0.1))",
                border: "1px solid rgba(251, 191, 36, 0.2)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
                <div className="text-center sm:text-left">
                  <p className="text-amber-100/50 text-xs mb-1">Committee Members</p>
                  <p
                    className="text-2xl sm:text-3xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #4ade80, #22c55e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ₹{tshirt.committeePrice}
                  </p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-amber-500/20" />
                <div className="text-center sm:text-left">
                  <p className="text-amber-100/50 text-xs mb-1">Non-Committee</p>
                  <p
                    className="text-2xl sm:text-3xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #fcd34d, #f59e0b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ₹{tshirt.nonCommitteePrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="group relative w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
              style={{
                background: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)",
                color: "#1a0d2e",
              }}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSize={selectedSize}
        tshirt={tshirt}
      />

      {/* Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default MerchSection;