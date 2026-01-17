'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { checkPaymentStatus, getOrder } from '@/lib/api';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  // Try multiple possible parameter names that PhonePe might use
  const txnId = searchParams.get('txnId') || 
                searchParams.get('merchantTransactionId') ||
                (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('txnId') : null) ||
                (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('merchantTransactionId') : null);
  
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (txnId) {
      console.log('✅ Processing payment success for txnId:', txnId);
      // Check payment status first
      checkPaymentStatus(txnId)
        .then(() => {
          // Small delay to ensure DB is updated
          return new Promise(resolve => setTimeout(resolve, 1000));
        })
        .then(() => getOrder(txnId))
        .then(data => {
          setOrder(data.order);
          setStatus(data.order.status === 'SUCCESS' ? 'success' : 'pending');
        })
        .catch(err => {
          console.error('Error fetching order:', err);
          setStatus('error');
        });
    } else {
      console.warn('⚠️ No transaction ID found in URL');
      setStatus('error');
    }
  }, [txnId]);

  if (!txnId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="glass-light rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-500/20">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-red-400">Invalid Payment Link</h1>
          <p className="text-slate-400 mb-6">Transaction ID is missing from the URL.</p>
          <Link
            href="/"
            className="block w-full py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="glass-light rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-yellow-500/20">
            <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-yellow-400">Unable to Verify Payment</h1>
          <p className="text-slate-400 mb-4">We couldn't verify your payment status. This might be due to a temporary issue.</p>
          {txnId && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-left">
              <p className="text-slate-500 text-xs mb-1">Transaction ID:</p>
              <p className="text-white text-xs font-mono break-all">{txnId}</p>
            </div>
          )}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="block w-full py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="block w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="glass-light rounded-2xl p-8 max-w-md w-full">
        <div className="text-center">
          {/* Icon */}
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            status === 'success' ? 'bg-green-500/20' : 'bg-yellow-500/20'
          }`}>
            {status === 'success' ? (
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold mb-2 ${
            status === 'success' ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {status === 'success' ? 'Payment Successful!' : 'Payment Processing'}
          </h1>
          
          <p className="text-slate-400 mb-6">
            {status === 'success' 
              ? 'Your order has been confirmed' 
              : 'Your payment is being verified'}
          </p>

          {/* Order Details */}
          {order && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Product:</span>
                  <span className="text-white font-medium">{order.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount:</span>
                  <span className="text-white font-medium">₹{order.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="text-white font-medium">{order.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'SUCCESS' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-slate-500 text-xs">Transaction ID:</p>
                  <p className="text-white text-xs font-mono break-all">{txnId}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all"
            >
              Back to Merch Page
            </Link>
            
            {status === 'pending' && (
              <button
                onClick={() => window.location.reload()}
                className="block w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Refresh Status
              </button>
            )}
          </div>

          <p className="text-slate-500 text-xs mt-6">
            Thank you for your purchase! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}