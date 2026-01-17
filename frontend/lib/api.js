// lib/api.js

// Use environment variable for API URL, fallback for development
// In production, this should be set to your backend URL (e.g., https://sparsh-backend.onrender.com)
const getApiBaseUrl = () => {
  // First priority: Environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Second priority: Detect if we're in production (Vercel)
  if (typeof window !== 'undefined') {
    const isProduction = window.location.hostname.includes('vercel.app') || 
                         window.location.hostname !== 'localhost';
    
    if (isProduction) {
      // In production, default to the expected backend URL
      return 'https://sparsh-backend.onrender.com';
    }
  }
  
  // Development fallback
  return 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

// DEBUG: Log API URL in both development and production for debugging
if (typeof window !== 'undefined') {
  console.log('🔍 API_BASE_URL:', API_BASE_URL);
  console.log('🔍 ENV Variable (NEXT_PUBLIC_API_URL):', process.env.NEXT_PUBLIC_API_URL || 'NOT SET');
  console.log('🔍 Current Origin:', window.location.origin);
  
  // Warn if using localhost in production
  if (API_BASE_URL.includes('localhost') && !window.location.hostname.includes('localhost')) {
    console.error('⚠️ WARNING: Using localhost API URL in production!');
    console.error('⚠️ Please set NEXT_PUBLIC_API_URL environment variable in Vercel to: https://sparsh-backend.onrender.com');
  }
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
    console.error('API URL attempted:', `${API_BASE_URL}/api/payment/create-link`);
    
    // Provide more helpful error messages
    let errorMessage = error.message || 'Network error occurred';
    
    // Check if it's a CORS or connection error
    if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
      if (API_BASE_URL.includes('localhost')) {
        errorMessage = 'Cannot connect to backend server. Make sure:\n1. Backend server is running\n2. NEXT_PUBLIC_API_URL environment variable is set in production';
      } else {
        errorMessage = `Cannot connect to backend at ${API_BASE_URL}. Please check:\n1. Backend server is running and accessible\n2. CORS is properly configured\n3. Network connection is stable`;
      }
    }
    
    return {
      success: false,
      error: errorMessage,
      networkError: true,
      apiUrl: API_BASE_URL
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