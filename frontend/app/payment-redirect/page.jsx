'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function PaymentRedirectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txnId = searchParams.get('txnId');

  useEffect(() => {
    // Redirect to payment-success page with the same txnId
    if (txnId) {
      router.replace(`/payment-success?txnId=${txnId}`);
    } else {
      // If no txnId, redirect to home
      router.replace('/');
    }
  }, [txnId, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl">Redirecting...</p>
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
