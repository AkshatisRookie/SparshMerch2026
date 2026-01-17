// lib/api.js

// Use environment variable for API URL, fallback for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// DEBUG: Check what URL is being used (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 API_BASE_URL:', API_BASE_URL);
  console.log('🔍 ENV Variable:', process.env.NEXT_PUBLIC_API_URL);
}

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

    const responseClone = response.clone();
    const responseText = await responseClone.text();
    console.log('Raw response text:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('✅ Parsed response data:', responseData);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      responseData = { message: responseText || 'Invalid response from server' };
    }

    if (!response.ok) {
      console.error('=== API Error Details ===');
      console.error('Status Code:', response.status);
      console.error('Error Response:', responseData);
      
      const errorMsg = responseData.message 
        || responseData.error 
        || `Server Error (${response.status}): ${response.statusText}`;
      
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
    console.error('Error:', error);
    
    return {
      success: false,
      error: error.message || 'Network error occurred',
      networkError: true
    };
  }
}

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

export async function checkPaymentStatus(merchantTransactionId) {
  try {
    console.log('🔍 Checking payment status for:', merchantTransactionId);
    
    const response = await fetch(`${API_BASE_URL}/api/payment/status/${merchantTransactionId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to check payment status');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Payment status check failed:', error);
    throw error;
  }
}

export async function getOrder(merchantTransactionId) {
  try {
    console.log('📦 Fetching order details for:', merchantTransactionId);
    
    const response = await fetch(`${API_BASE_URL}/api/order/${merchantTransactionId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch order');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Order fetch failed:', error);
    throw error;
  }
}