const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Environment variables
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://sparsh-merch2026.vercel.app';
const PHONEPE_HOST = process.env.PHONEPE_HOST || 'https://api-preprod.phonepe.com/apis/pg-sandbox';
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT86';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '96434309-7796-489d-8924-ab56988a6076';
const SALT_INDEX = 1;

const allowedOrigins = [
  "http://localhost:3000",
  "https://sparsh-merch2026.vercel.app",
  "https://sparsh-backend.onrender.com"
];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Handle preflight requests explicitly
app.options('*', cors());
// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... rest of your code

// At the top, add pricing config
const PRODUCT_NAME = 'Sparsh Merch';
const NON_COMMITTEE_PRICE = 309;
const COMMITTEE_PRICE = 279;

// Helper function to generate checksum
function generateChecksum(payload, endpoint) {
  const bufferObj = Buffer.from(JSON.stringify(payload), 'utf8');
  const base64Payload = bufferObj.toString('base64');
  const string = base64Payload + endpoint + SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + SALT_INDEX;
  return { base64Payload, checksum };
}

// Helper: Generate unique transaction ID
function generateTransactionId() {
  return 'MT' + Date.now() + Math.random().toString(36).substring(2, 9);
}


// Updated Route 1: Initiate Payment
app.post('/api/payment/create-link', async (req, res) => {

  try {
    const { 
      mobileNumber, 
      userName, 
      email,
      admissionNo,
      year,
      nameOnTshirt,
      size,
      isCommitteeMember,
      committee
    } = req.body;

    // Validate input
    if (!mobileNumber || !userName) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and name are required'
      });
    }

    // Additional validation for t-shirt orders
    if (nameOnTshirt && !size) {
      return res.status(400).json({
        success: false,
        message: 'Size is required for t-shirt orders'
      });
    }

    // Find or create customer
    let customer = await prisma.customer.findFirst({
      where: { mobile: mobileNumber }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: userName,
          mobile: mobileNumber,
          email: email || null,
          admissionNo: admissionNo || null,
          year: year || null
        }
      });
      console.log('✅ New customer created:', customer.id);
    } else {
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: userName,
          email: email || customer.email,
          admissionNo: admissionNo || customer.admissionNo,
          year: year || customer.year
        }
      });
      console.log('✅ Existing customer updated:', customer.id);
    }

    // Calculate final price
    const finalAmount = (isCommitteeMember ? COMMITTEE_PRICE : NON_COMMITTEE_PRICE) * 100;

    // Generate unique transaction ID
    const merchantTransactionId = generateTransactionId();
    const merchantUserId = 'MUID' + customer.id;

    // Create order in database FIRST
    const order = await prisma.order.create({
      data: {
        merchantTransactionId: merchantTransactionId,
        customerId: customer.id,
        productName: PRODUCT_NAME,
        amount: finalAmount,
        paymentStatus: 'PENDING',
        redirectUrl: `${FRONTEND_URL}/payment-success?txnId=${merchantTransactionId}`,
        nameOnTshirt: nameOnTshirt || null,
        size: size || null,
        isCommitteeMember: isCommitteeMember || false,
        committee: committee || null
      }
    });

    console.log('📦 Order created:', {
      id: order.id,
      customer: customer.name,
      size: size,
      nameOnTshirt: nameOnTshirt,
      committee: isCommitteeMember ? committee : 'N/A',
      amount: finalAmount
    });

    // Prepare PhonePe payment payload
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: finalAmount,
      redirectUrl: `${FRONTEND_URL}/payment-success?txnId=${merchantTransactionId}`,
      redirectMode: 'GET',
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const endpoint = '/pg/v1/pay';
    const { base64Payload, checksum } = generateChecksum(payload, endpoint);

    // Call PhonePe API
    const response = await axios.post(
      `${PHONEPE_HOST}${endpoint}`,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'accept': 'application/json'
        }
      }
    );

    // Update order with payment URL
    const paymentUrl = response.data.data?.instrumentResponse?.redirectInfo?.url;
    
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: paymentUrl }
    });

    console.log('💳 Payment link created:', merchantTransactionId);

    res.json({
      success: true,
      merchantTransactionId: merchantTransactionId,
      orderId: order.id,
      data: response.data
    });

  } catch (error) {
    console.error('❌ Payment creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: error.response?.data || error.message
    });
  }
});
// Route 2: Check Payment Status & Update Database
app.get('/api/payment/status/:merchantTransactionId', async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;

    // Check status with PhonePe
    const endpoint = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const string = endpoint + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + SALT_INDEX;

    const response = await axios.get(
      `${PHONEPE_HOST}${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID,
          'accept': 'application/json'
        }
      }
    );

    const statusData = response.data;

    // Update order in database
    if (statusData.success && statusData.code === 'PAYMENT_SUCCESS') {
      await prisma.order.update({
        where: { merchantTransactionId: merchantTransactionId },
        data: {
          paymentStatus: 'SUCCESS',
          phonepeTransactionId: statusData.data?.transactionId,
          paymentMethod: statusData.data?.paymentInstrument?.type,
          paidAt: new Date()
        }
      });
      console.log('✅ Order marked as SUCCESS:', merchantTransactionId);
    } else if (statusData.code === 'PAYMENT_ERROR' || statusData.code === 'PAYMENT_DECLINED') {
      await prisma.order.update({
        where: { merchantTransactionId: merchantTransactionId },
        data: {
          paymentStatus: 'FAILED'
        }
      });
      console.log('❌ Order marked as FAILED:', merchantTransactionId);
    }

    res.json(statusData);

  } catch (error) {
    console.error('❌ Status check error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Status check failed',
      error: error.message
    });
  }
});

// Route 3: Get Order Details
// Route 3: Get Order Details - UPDATED
app.get('/api/order/:merchantTransactionId', async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;

    const order = await prisma.order.findUnique({
      where: { merchantTransactionId: merchantTransactionId },
      include: {
        customer: {
          select: {
            name: true,
            mobile: true,
            email: true,
            admissionNo: true,
            year: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: {
        id: order.id,
        transactionId: order.merchantTransactionId,
        product: order.productName,
        amount: order.amount / 100,
        status: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        customer: order.customer,
        // New fields
        nameOnTshirt: order.nameOnTshirt,
        size: order.size,
        isCommitteeMember: order.isCommitteeMember,
        committee: order.committee,
        createdAt: order.createdAt,
        paidAt: order.paidAt
      }
    });

  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Route 4: Get Customer Orders
app.get('/api/customer/:mobile/orders', async (req, res) => {
  try {
    const { mobile } = req.params;

    const customer = await prisma.customer.findFirst({
      where: { mobile: mobile },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!customer) {
      return res.json({
        success: true,
        customer: null,
        orders: []
      });
    }

    res.json({
      success: true,
      customer: {
        name: customer.name,
        mobile: customer.mobile,
        email: customer.email
      },
      orders: customer.orders.map(order => ({
        id: order.id,
        transactionId: order.merchantTransactionId,
        product: order.productName,
        amount: order.amount / 100,
        status: order.paymentStatus,
        createdAt: order.createdAt,
        paidAt: order.paidAt
      }))
    });

  } catch (error) {
    console.error('❌ Error fetching customer orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Route 5: Admin - Get All Orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;

    const where = status ? { paymentStatus: status } : {};

    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: {
          select: {
            name: true,
            mobile: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit)
    });

    res.json({
      success: true,
      count: orders.length,
      orders: orders.map(order => ({
        id: order.id,
        transactionId: order.merchantTransactionId,
        customer: order.customer,
        product: order.productName,
        amount: order.amount / 100,
        status: order.paymentStatus,
        createdAt: order.createdAt,
        paidAt: order.paidAt
      }))
    });

  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Frontend (same as before with minor updates)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Buy ${PRODUCT_NAME}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }
        h1 { color: #5f259f; margin-bottom: 10px; text-align: center; }
        .subtitle { color: #666; text-align: center; margin-bottom: 30px; font-size: 14px; }
        .product-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
        }
        .product-details h2 { margin: 0 0 15px 0; font-size: 24px; }
        .price { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .form-group { margin-bottom: 20px; }
        label { display: block; color: #333; margin-bottom: 8px; font-weight: 500; }
        input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        input:focus { outline: none; border-color: #5f259f; }
        button {
          width: 100%;
          padding: 15px;
          background: #5f259f;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover { background: #4a1d7a; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        .result { margin-top: 20px; padding: 15px; border-radius: 10px; display: none; }
        .result.success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
        .result.error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Buy ${PRODUCT_NAME}</h1>
        <p class="subtitle">Secure Payment via PhonePe</p>
        
        <div class="product-info">
          <div class="product-details">
            <h2>${PRODUCT_NAME}</h2>
            <div class="price">₹${NON_COMMITTEE_PRICE}</div>
            <p style="margin-top: 10px;">One-time payment • Instant access</p>
          </div>
        </div>
        
        <form id="paymentForm">
          <div class="form-group">
            <label>Mobile Number *</label>
            <input type="tel" id="mobile" placeholder="10 digit mobile" required pattern="[0-9]{10}" />
          </div>
          
          <div class="form-group">
            <label>Your Name *</label>
            <input type="text" id="name" placeholder="Full name" required />
          </div>
          
          <div class="form-group">
            <label>Email (Optional)</label>
            <input type="email" id="email" placeholder="your@email.com" />
          </div>
          
          <button type="submit" id="submitBtn">Pay ₹${NON_COMMITTEE_PRICE} Now</button>
          
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 15px;">
            🔒 Secure payment • Powered by PhonePe
          </p>
        </form>
        
        <div id="result" class="result"></div>
      </div>
      
      <script>
        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = document.getElementById('submitBtn');
          const resultDiv = document.getElementById('result');
          
          submitBtn.disabled = true;
          submitBtn.textContent = 'Processing...';
          resultDiv.style.display = 'none';
          
          const mobile = document.getElementById('mobile').value;
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          
          try {
            const response = await fetch('/api/payment/create-link', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                mobileNumber: mobile,
                userName: name,
                email: email || undefined
              })
            });
            
            const data = await response.json();
            
            if (data.success && data.data?.data?.instrumentResponse?.redirectInfo?.url) {
              resultDiv.className = 'result success';
              resultDiv.innerHTML = '<strong>✓ Order Created!</strong><br>Redirecting to payment...';
              resultDiv.style.display = 'block';
              
              setTimeout(() => {
                window.location.href = data.data.data.instrumentResponse.redirectInfo.url;
              }, 1500);
            } else {
              throw new Error(data.message || 'Payment failed');
            }
          } catch (error) {
            resultDiv.className = 'result error';
            resultDiv.innerHTML = '<strong>✗ Error:</strong><br>' + error.message;
            resultDiv.style.display = 'block';
          } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Pay ₹${NON_COMMITTEE_PRICE} Now';
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Success page with order details
app.get('/payment-success', async (req, res) => {
  const txnId = req.query.txnId;
  
  try {
    // Fetch order details
    const order = await prisma.order.findUnique({
      where: { merchantTransactionId: txnId },
      include: { customer: true }
    });

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Success</title>
        <style>
          body {
            font-family: Arial;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .icon { font-size: 80px; color: #28a745; }
          h1 { color: #28a745; margin: 20px 0; }
          .details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .detail-row:last-child { border-bottom: none; }
          button {
            padding: 12px 30px;
            background: #5f259f;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px 5px;
          }
          button:hover { background: #4a1d7a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">✓</div>
          <h1>Payment Successful!</h1>
          <p>Your order has been confirmed</p>
          
          ${order ? `
          <div class="details">
            <div class="detail-row">
              <span><strong>Product:</strong></span>
              <span>${order.productName}</span>
            </div>
            <div class="detail-row">
              <span><strong>Amount:</strong></span>
              <span>₹${order.amount / 100}</span>
            </div>
            <div class="detail-row">
              <span><strong>Customer:</strong></span>
              <span>${order.customer.name}</span>
            </div>
            <div class="detail-row">
              <span><strong>Transaction ID:</strong></span>
              <span style="font-size: 12px;">${txnId}</span>
            </div>
          </div>
          ` : ''}
          
          <button onclick="checkStatus('${txnId}')">Verify Payment</button>
          <button onclick="window.location.href='/'" style="background: #6c757d;">
            Back to Home
          </button>
        </div>
        
        <script>
          async function checkStatus(txnId) {
            try {
              const res = await fetch('/api/payment/status/' + txnId);
              const data = await res.json();
              alert('Status: ' + data.code);
            } catch (err) {
              alert('Error: ' + err.message);
            }
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    res.send('<h1>Order Not Found</h1>');
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});


const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     PhonePe Payment System with Database               ║
╚════════════════════════════════════════════════════════╝

🚀 Server: http://localhost:${PORT}
📦 Product: ${PRODUCT_NAME}
💰 Non-Committee Price: ₹${NON_COMMITTEE_PRICE}
💰 Committee Price: ₹${COMMITTEE_PRICE}
🗄️  Database: Supabase + Prisma

API Endpoints:
  POST   /api/payment/create-link
  GET    /api/payment/status/:txnId
  GET    /api/order/:txnId
  GET    /api/customer/:mobile/orders
  GET    /api/admin/orders

Ready to accept payments! 💳
  `);
});

// Handle port conflicts gracefully
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`
❌ Port ${PORT} is already in use!

Solutions:
1. Kill the process using port ${PORT}:
   Windows: netstat -ano | findstr :${PORT}
   Then: taskkill /F /PID <PID>

2. Use a different port:
   PORT=3001 node server.js
   or
   set PORT=3001 && node server.js

3. Change the port in server.js or use environment variable
    `);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});