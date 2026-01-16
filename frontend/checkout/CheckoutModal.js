'use client';

import { useState } from 'react';
import { createPayment } from '@/lib/api';

const CheckoutModal = ({ product, isOpen, onClose, selectedSize, selectedColor }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createPayment({
        mobileNumber: formData.mobile,
        userName: formData.name,
        email: formData.email
      });

      if (response.success && response.data?.data?.instrumentResponse?.redirectInfo?.url) {
        // Redirect to PhonePe
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
      } else {
        setError('Payment initiation failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 glass-light rounded-2xl p-6 animate-modalIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2">Complete Your Order</h2>
        <p className="text-slate-400 text-sm mb-6">Fill in your details to proceed to payment</p>

        {/* Order Summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-white font-semibold">{product.name}</p>
              <p className="text-slate-400 text-sm">
                {selectedSize && `Size: ${selectedSize}`}
                {selectedSize && selectedColor && ' • '}
                {selectedColor && `Color: ${selectedColor.name}`}
              </p>
            </div>
            <p className="text-white font-bold text-lg">₹{product.price}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Full Name *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">Mobile Number *</label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
              placeholder="10 digit mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">Email (Optional)</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-white text-slate-900 font-semibold transition-all duration-300 hover:bg-slate-200 disabled:bg-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Proceed to Payment - ₹{product.price}
              </>
            )}
          </button>

          <p className="text-slate-500 text-xs text-center">
            🔒 Secure payment powered by PhonePe
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;