import React, { useState, useEffect } from "react";
import { createPayment } from '@/lib/api'; 
// Temporarily change in OrderModal.js
const API_BASE_URL = 'https://sparshmerch2026.onrender.com';

const OrderModal = ({ isOpen, onClose, selectedSize, tshirt }) => {
  const [formData, setFormData] = useState({
    name: "",
    nameOnTshirt: "",
    admissionNo: "",
    contactNo: "",
    isCommitteeMember: false,
    year: "",
    committee: "",
    size: selectedSize || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const years = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5", label: "5th Year/MBA/MTech/PhD" },
  ];

  const committees = [
    "Web Development",
    "Admin & Documentation",
    "Managerial",
    "Sponsorship & Finance",
    "Design & Social Media",
    "Media Coverage & Cinematography",
    "Publicity & Public Relations",
    "Hospitality & Discipline",
    "Infra & Inhouse",
  ];

  useEffect(() => {
    if (selectedSize) {
      setFormData((prev) => ({ ...prev, size: selectedSize }));
    }
  }, [selectedSize]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.nameOnTshirt.trim()) {
      newErrors.nameOnTshirt = "Name on T-shirt is required";
    } else if (formData.nameOnTshirt.trim().length > 15) {
      newErrors.nameOnTshirt = "Maximum 15 characters allowed";
    }

    if (!formData.admissionNo.trim()) {
      newErrors.admissionNo = "Admission number is required";
    }

    // Fixed mobile validation - remove spaces and check
    const cleanedPhone = formData.contactNo.replace(/\s+/g, '');
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
    } else if (cleanedPhone.length !== 10) {
      newErrors.contactNo = "Mobile number must be exactly 10 digits";
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.contactNo = "Mobile number must start with 6, 7, 8, or 9";
    }

    if (!formData.year) {
      newErrors.year = "Please select your year";
    }

    if (formData.isCommitteeMember && !formData.committee) {
      newErrors.committee = "Please select your committee";
    }

    if (!formData.size) {
      newErrors.size = "Please select a size";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const finalPrice = formData.isCommitteeMember
        ? tshirt.committeePrice
        : tshirt.nonCommitteePrice;

      // Backend expects these exact field names
      const orderData = {
        mobileNumber: formData.contactNo,
        userName: formData.name,
        email: null, // Optional - you can add email field to form if needed
        admissionNo: formData.admissionNo,
        year: formData.year,
        nameOnTshirt: formData.nameOnTshirt,
        size: formData.size,
        isCommitteeMember: formData.isCommitteeMember,
        committee: formData.committee || null,
      };

      console.log("Submitting order:", orderData);

      // Call the backend API
      const response = await createPayment(orderData);

      console.log("Payment response:", response);

      // Check if API call was successful
      if (!response.success) {
        // Show the actual error from backend
        console.error("Payment creation failed:", response);
        
        alert(`Payment Failed!\n\nError: ${response.error}\n\nStatus: ${response.status || 'Unknown'}\n\nPlease check:\n1. Backend server is running\n2. Database is connected\n3. All required fields are present`);
        return;
      }

      console.log("Full response data:", response.data);

      // Handle successful response - Check multiple possible locations for payment URL
      // Backend returns: response.data.data.data.instrumentResponse.redirectInfo.url
      const paymentUrl = 
        response.data?.data?.data?.instrumentResponse?.redirectInfo?.url ||
        response.data?.data?.instrumentResponse?.redirectInfo?.url ||
        response.data?.instrumentResponse?.redirectInfo?.url;

      console.log("Payment URL found:", paymentUrl);

      if (paymentUrl && paymentUrl.startsWith('http')) {
        console.log("✅ Redirecting to PhonePe:", paymentUrl);
        
        // Close modal first
        onClose();
        
        // Small delay to ensure modal closes, then redirect
        setTimeout(() => {
          window.location.href = paymentUrl;
        }, 300);
      } else {
        // No payment URL found - show success message
        console.error("❌ No payment URL in response. Full response:", response);
        console.error("Response structure:", JSON.stringify(response, null, 2));
        
        alert(`Order created successfully!\n\nTotal: ₹${finalPrice}\nSize: ${formData.size}\nName on T-shirt: ${formData.nameOnTshirt}\n\nTransaction ID: ${response.merchantTransactionId || response.data?.merchantTransactionId || 'N/A'}\n\nNote: Payment URL not received. Please check console logs.`);
        
        onClose();
        resetForm();
      }

    } catch (error) {
      console.error("=== Order Submission Error ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      // Show detailed error to user for debugging
      let errorMessage = "Failed to create order. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`Payment Error:\n\n${errorMessage}\n\nPlease check the console for details.`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      nameOnTshirt: "",
      admissionNo: "",
      contactNo: "",
      isCommitteeMember: false,
      year: "",
      committee: "",
      size: selectedSize || "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for contact number - only allow digits
    if (name === "contactNo") {
      const numbersOnly = value.replace(/\D/g, ''); // Remove non-digits
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly.slice(0, 10), // Limit to 10 digits
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const finalPrice = formData.isCommitteeMember
    ? tshirt.committeePrice
    : tshirt.nonCommitteePrice;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center sm:p-4">
        {/* Modal Container */}
        <div
          className="relative w-full sm:max-w-lg bg-[#1a0d2e] sm:rounded-2xl shadow-2xl flex flex-col"
          style={{
            maxHeight: "100vh",
            height: "auto",
            border: "1px solid rgba(251, 191, 36, 0.2)",
            borderRadius: "24px 24px 0 0",
          }}
        >
          {/* HEADER */}
          <div
            className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-amber-500/20 rounded-t-3xl sm:rounded-t-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 119, 6, 0.1))",
            }}
          >
            <div className="sm:hidden w-10 h-1 bg-white/30 rounded-full mx-auto mb-3" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-300">
                  Complete Your Order
                </h3>
                <p className="text-amber-100/50 text-xs sm:text-sm mt-0.5">
                  {tshirt.name} - Size {formData.size || selectedSize || "Not Selected"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-100/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* SCROLLABLE FORM */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{
              maxHeight: "calc(100vh - 280px)",
              minHeight: "200px",
            }}
          >
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-amber-100/80 text-sm font-medium mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                    errors.name ? "border-red-500/50" : "border-amber-500/20 focus:border-amber-500/50"
                  }`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Name on T-shirt */}
              <div>
                <label className="block text-amber-100/80 text-sm font-medium mb-1.5">
                  Name on T-shirt <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nameOnTshirt"
                    value={formData.nameOnTshirt}
                    onChange={handleChange}
                    placeholder="e.g., ARYAN"
                    maxLength={15}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all uppercase ${
                      errors.nameOnTshirt ? "border-red-500/50" : "border-amber-500/20 focus:border-amber-500/50"
                    }`}
                    style={{ letterSpacing: "0.05em" }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-100/30 text-xs">
                    {formData.nameOnTshirt.length}/15
                  </span>
                </div>
                {errors.nameOnTshirt && <p className="text-red-400 text-xs mt-1">{errors.nameOnTshirt}</p>}
                
                {formData.nameOnTshirt && (
                  <div className="mt-2 p-3 rounded-lg bg-white/5 border border-amber-500/10">
                    <p className="text-amber-100/50 text-[10px] uppercase tracking-wider mb-1">Preview on T-shirt</p>
                    <p 
                      className="text-amber-300 font-bold text-lg tracking-wider uppercase text-center"
                      style={{ 
                        fontFamily: "'Arial Black', sans-serif",
                        textShadow: "0 0 10px rgba(251, 191, 36, 0.3)"
                      }}
                    >
                      {formData.nameOnTshirt || "YOUR NAME"}
                    </p>
                  </div>
                )}
              </div>

              {/* Admission Number */}
              <div>
                <label className="block text-amber-100/80 text-sm font-medium mb-1.5">
                  Admission Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="admissionNo"
                  value={formData.admissionNo}
                  onChange={handleChange}
                  placeholder="e.g., U24AI069"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                    errors.admissionNo ? "border-red-500/50" : "border-amber-500/20 focus:border-amber-500/50"
                  }`}
                />
                {errors.admissionNo && <p className="text-red-400 text-xs mt-1">{errors.admissionNo}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-amber-100/80 text-sm font-medium mb-1.5">
                  Contact Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/50 text-sm">+91</span>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    placeholder="8602568588"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                      errors.contactNo ? "border-red-500/50" : "border-amber-500/20 focus:border-amber-500/50"
                    }`}
                  />
                  {/* Character counter */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-100/30 text-xs">
                    {formData.contactNo.length}/10
                  </span>
                </div>
                {errors.contactNo && <p className="text-red-400 text-xs mt-1">{errors.contactNo}</p>}
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-amber-100/80 text-sm font-medium mb-1.5">
                  Year / Program <span className="text-red-400">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer ${
                    errors.year ? "border-red-500/50" : "border-amber-500/20 focus:border-amber-500/50"
                  } ${!formData.year ? "text-amber-100/30" : ""}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23fbbf24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "20px",
                  }}
                >
                  <option value="" disabled>Select your year</option>
                  {years.map((year) => (
                    <option key={year.value} value={year.value} className="bg-[#1a0d2e] text-white">
                      {year.label}
                    </option>
                  ))}
                </select>
                {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
              </div>

              {/* Committee Member Toggle */}
              <div
                className="p-3 sm:p-4 rounded-xl border transition-all"
                style={{
                  background: formData.isCommitteeMember
                    ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))"
                    : "rgba(255, 255, 255, 0.02)",
                  borderColor: formData.isCommitteeMember
                    ? "rgba(34, 197, 94, 0.3)"
                    : "rgba(251, 191, 36, 0.1)",
                }}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex-1 mr-3">
                    <span className="text-amber-100/90 text-sm font-medium">
                      Sparsh Committee Member?
                    </span>
                    <p className="text-amber-100/40 text-xs mt-0.5">
                      Get ₹{tshirt.nonCommitteePrice - tshirt.committeePrice} discount
                    </p>
                  </div>

                  <div 
                    className="relative flex-shrink-0 w-12 h-6 cursor-pointer"
                    onClick={() => handleChange({ target: { name: 'isCommitteeMember', type: 'checkbox', checked: !formData.isCommitteeMember }})}
                  >
                    <div
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        formData.isCommitteeMember
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-white/20"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                          formData.isCommitteeMember ? "left-[26px]" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                </label>
              </div>

              {/* Committee Selection */}
              {formData.isCommitteeMember && (
                <div className="animate-fadeIn">
                  <label className="block text-amber-100/80 text-sm font-medium mb-1.5">
                    Select Committee <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="committee"
                    value={formData.committee}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all appearance-none cursor-pointer ${
                      errors.committee ? "border-red-500/50" : "border-green-500/30 focus:border-green-500/50"
                    } ${!formData.committee ? "text-amber-100/30" : ""}`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2322c55e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      backgroundSize: "20px",
                    }}
                  >
                    <option value="" disabled>Select your committee</option>
                    {committees.map((committee) => (
                      <option key={committee} value={committee} className="bg-[#1a0d2e] text-white">
                        {committee}
                      </option>
                    ))}
                  </select>
                  {errors.committee && <p className="text-red-400 text-xs mt-1">{errors.committee}</p>}
                </div>
              )}

              {/* Size Selection */}
              <div>
                <label className="block text-amber-100/80 text-sm font-medium mb-2">
                  Confirm Size <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {tshirt.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, size }));
                        if (errors.size) setErrors((prev) => ({ ...prev, size: "" }));
                      }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-sm font-medium transition-all duration-300 ${
                        formData.size === size
                          ? "bg-gradient-to-br from-amber-400 to-amber-600 text-black scale-105 shadow-lg shadow-amber-500/30"
                          : "bg-white/5 text-amber-100/70 border border-amber-500/20 hover:border-amber-500/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.size && <p className="text-red-400 text-xs mt-1">{errors.size}</p>}
              </div>
            </div>
          </div>

          {/* FIXED FOOTER */}
          <div
            className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-amber-500/20 safe-area-bottom"
            style={{
              background: "#1a0d2e",
              boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-amber-100/50 text-sm">Total:</span>
                <span 
                  className={`text-2xl sm:text-3xl font-bold ${
                    formData.isCommitteeMember ? "text-green-400" : "text-amber-400"
                  }`}
                >
                  ₹{finalPrice}
                </span>
              </div>

              {formData.isCommitteeMember && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs sm:text-sm font-medium">
                    🎉 Save ₹{tshirt.nonCommitteePrice - tshirt.committeePrice}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isSubmitting
                  ? "rgba(251, 191, 36, 0.3)"
                  : "linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)",
                color: "#1a0d2e",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Proceed to Payment - ₹{finalPrice}
                </span>
              )}
            </button>

            <p className="text-amber-100/30 text-[10px] sm:text-xs text-center mt-2">
              Secure payment via PhonePe
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .safe-area-bottom {
          padding-bottom: max(16px, env(safe-area-inset-bottom));
        }

        body.modal-open {
          overflow: hidden;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default OrderModal;