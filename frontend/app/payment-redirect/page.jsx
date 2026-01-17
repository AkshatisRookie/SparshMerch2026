'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PaymentRedirectContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to extract txnId from various sources
    const getTxnId = () => {
      // Try searchParams first
      let txnId = searchParams.get('txnId') || searchParams.get('merchantTransactionId');
      
      // If not found, try window.location.search directly
      if (!txnId && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        txnId = urlParams.get('txnId') || urlParams.get('merchantTransactionId');
      }
      
      // PhonePe might also pass it in hash or other params, check all query params
      if (!txnId && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        // Check all params to see if any contain transaction info
        for (const [key, value] of urlParams.entries()) {
          if (key.toLowerCase().includes('txn') || key.toLowerCase().includes('transaction') || key.toLowerCase().includes('merchant')) {
            txnId = value;
            break;
          }
        }
      }
      
      return txnId;
    };

    const txnId = getTxnId();
    
    console.log('🔍 Payment Redirect Page - Current URL:', typeof window !== 'undefined' ? window.location.href : 'N/A');
    console.log('🔍 All URL Params:', typeof window !== 'undefined' ? Array.from(new URLSearchParams(window.location.search).entries()) : []);
    console.log('🔍 Extracted txnId:', txnId);

    // Redirect immediately using window.location for more reliable redirect
    if (txnId) {
      console.log('🔄 Redirecting to payment-success with txnId:', txnId);
      const redirectUrl = `/payment-success?txnId=${encodeURIComponent(txnId)}`;
      console.log('🔄 Redirect URL:', redirectUrl);
      
      // Use window.location.replace for hard redirect (doesn't add to history)
      // This ensures a clean redirect and prevents back button issues
      window.location.replace(redirectUrl);
    } else {
      console.warn('⚠️ No txnId found in redirect URL');
      console.warn('⚠️ Full URL:', typeof window !== 'undefined' ? window.location.href : 'N/A');
      
      // Try to extract from URL directly as last resort
      if (typeof window !== 'undefined') {
        const urlMatch = window.location.href.match(/[?&](?:txnId|merchantTransactionId)=([^&]+)/i);
        if (urlMatch && urlMatch[1]) {
          const extractedTxnId = decodeURIComponent(urlMatch[1]);
          console.log('✅ Found txnId in URL pattern:', extractedTxnId);
          window.location.replace(`/payment-success?txnId=${encodeURIComponent(extractedTxnId)}`);
          return;
        }
      }
      
      // If no txnId, redirect to home after a delay
      setTimeout(() => {
        console.warn('⚠️ No transaction ID found, redirecting to home');
        window.location.replace('/');
      }, 2000);
    }
  }, [searchParams]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl">Redirecting to payment confirmation...</p>
        <p className="text-slate-400 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
}

export default function PaymentRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <PaymentRedirectContent />
    </Suspense>
  );
}
