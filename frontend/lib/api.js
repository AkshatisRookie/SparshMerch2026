// lib/api.js

// TEMPORARY: Hardcoded for testing
const API_BASE_URL = 'http://localhost:5000';

// DEBUG: Check what URL is being used
console.log('🔍 API_BASE_URL:', API_BASE_URL);
console.log('🔍 ENV Variable:', process.env.NEXT_PUBLIC_API_URL);

export async function createPayment(orderData) {
  try {
    console.log('=== API Call Started ===');
    console.log('API URL:', `${API_BASE_URL}/api/payment/create-link`);
    console.log('Order Data being sent:', JSON.stringify(orderData, null, 2));

    const response = await fetch(`${API_BASE_URL}/api/payment/create-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Clone response to read it multiple times
    const responseClone = response.clone();
    
    // Try to get response as text first
    const responseText = await responseClone.text();
    console.log('Raw response text:', responseText);

    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('✅ Parsed response data:', responseData);
      console.log('🔍 Response structure check:', {
        hasData: !!responseData?.data,
        hasDataData: !!responseData?.data?.data,
        hasDataDataData: !!responseData?.data?.data?.data,
        instrumentResponse: responseData?.data?.data?.data?.instrumentResponse,
        redirectInfo: responseData?.data?.data?.data?.instrumentResponse?.redirectInfo,
        url: responseData?.data?.data?.data?.instrumentResponse?.redirectInfo?.url
      });
      
      // Try to find the URL in any nested location
      console.log('🔎 All possible URL locations:', {
        level1: responseData?.data?.instrumentResponse?.redirectInfo?.url,
        level2: responseData?.data?.data?.instrumentResponse?.redirectInfo?.url,
        level3: responseData?.data?.data?.data?.instrumentResponse?.redirectInfo?.url,
      });
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      responseData = { message: responseText || 'Invalid response from server' };
    }

    if (!response.ok) {
      // Log detailed error information
      console.error('=== API Error Details ===');
      console.error('Status Code:', response.status);
      console.error('Status Text:', response.statusText);
      console.error('Error Response:', responseData);
      
      // Create detailed error message
      const errorMsg = responseData.message 
        || responseData.error 
        || `Server Error (${response.status}): ${response.statusText}`;
      
      console.error('Error Message:', errorMsg);
      
      // Don't throw yet - return error info for UI to handle
      return {
        success: false,
        error: errorMsg,
        status: response.status,
        details: responseData
      };
    }

    console.log('=== API Call Success ===');
    return {
      success: true,
      data: responseData,
      status: response.status
    };

  } catch (error) {
    console.error('=== Network or Fetch Error ===');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    // Return error instead of throwing
    return {
      success: false,
      error: error.message || 'Network error occurred',
      networkError: true
    };
  }
}

// Optional: Add a function to check backend health
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

// Check payment status
export async function checkPaymentStatus(merchantTransactionId) {
  try {
    console.log('🔍 Checking payment status for:', merchantTransactionId);
    
    const response = await fetch(`${API_BASE_URL}/api/payment/status/${merchantTransactionId}`);
    
    const data = await response.json();
    console.log('📊 Payment status response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to check payment status');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Payment status check failed:', error);
    throw error;
  }
}

// Get order details
export async function getOrder(merchantTransactionId) {
  try {
    console.log('📦 Fetching order details for:', merchantTransactionId);
    
    const response = await fetch(`${API_BASE_URL}/api/order/${merchantTransactionId}`);
    
    const data = await response.json();
    console.log('📄 Order details response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch order');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Order fetch failed:', error);
    throw error;
  }
}