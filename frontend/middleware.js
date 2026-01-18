import { NextResponse } from 'next/server';


export async function middleware(request) {
 // Handle POST requests to /payment-success (from PhonePe callback)
 // Convert POST to GET by redirecting with the same query params
 if (request.method === 'POST' && request.nextUrl.pathname === '/payment-success') {
   const txnId = request.nextUrl.searchParams.get('txnId') ||
                 request.nextUrl.searchParams.get('merchantTransactionId');
  
   console.log('📥 Middleware: POST to /payment-success, txnId:', txnId);


   if (txnId) {
     // Redirect to GET with same txnId
     const successUrl = new URL('/payment-success', request.url);
     successUrl.searchParams.set('txnId', txnId);
    
     console.log('✅ Middleware: Redirecting POST to GET:', successUrl.toString());
    
     // 303 See Other for POST-to-GET redirect
     return NextResponse.redirect(successUrl, { status: 303 });
   }
  
   // No txnId, redirect to home
   return NextResponse.redirect(new URL('/', request.url));
 }


 return NextResponse.next();
}


export const config = {
 matcher: '/payment-success',
};
