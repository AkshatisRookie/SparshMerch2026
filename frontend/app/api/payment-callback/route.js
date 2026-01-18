import { NextResponse } from 'next/server';

// Handle POST callback from PhonePe
export async function POST(request) {
  try {
    // Parse form data from PhonePe callback
    const formData = await request.formData();
    const searchParams = new URL(request.url).searchParams;
    
    // Try to get transaction ID from various sources
    const txnId = searchParams.get('txnId') ||
                  searchParams.get('merchantTransactionId') ||
                  formData.get('transactionId') ||
                  formData.get('merchantTransactionId');
    
    // Get payment status from form data
    const code = formData.get('code');
    const providerReferenceId = formData.get('providerReferenceId');
    
    console.log('📥 PhonePe POST Callback received:', {
      txnId,
      code,
      providerReferenceId,
      url: request.url
    });

    if (!txnId) {
      console.error('❌ No transaction ID in callback');
      // Redirect to home if no txnId
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect to the payment success page with the txnId
    const successUrl = new URL('/payment-success', request.url);
    successUrl.searchParams.set('txnId', txnId);
    
    // Add payment status if available
    if (code) {
      successUrl.searchParams.set('code', code);
    }

    console.log('✅ Redirecting to:', successUrl.toString());
    
    return NextResponse.redirect(successUrl, { status: 303 }); // 303 See Other for POST-to-GET redirect
  } catch (error) {
    console.error('❌ Error processing payment callback:', error);
    
    // Try to extract txnId from URL as fallback
    const searchParams = new URL(request.url).searchParams;
    const txnId = searchParams.get('txnId') || searchParams.get('merchantTransactionId');
    
    if (txnId) {
      const successUrl = new URL('/payment-success', request.url);
      successUrl.searchParams.set('txnId', txnId);
      return NextResponse.redirect(successUrl, { status: 303 });
    }
    
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Also handle GET requests (for direct navigation)
export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const txnId = searchParams.get('txnId') || searchParams.get('merchantTransactionId');
  
  console.log('📥 GET request to payment-callback:', { txnId });
  
  if (txnId) {
    const successUrl = new URL('/payment-success', request.url);
    successUrl.searchParams.set('txnId', txnId);
    return NextResponse.redirect(successUrl, { status: 302 });
  }
  
  return NextResponse.redirect(new URL('/', request.url));
}

