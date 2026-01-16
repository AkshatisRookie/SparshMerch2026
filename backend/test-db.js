require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing database connection...\n');
    
    await prisma.$connect();
    console.log('✅ Database connected successfully!\n');
    
    // Count records
    const customerCount = await prisma.customer.count();
    const orderCount = await prisma.order.count();
    
    console.log('📊 Database Stats:');
    console.log(`   Customers: ${customerCount}`);
    console.log(`   Orders: ${orderCount}\n`);
    
    console.log('✅ Everything is working!');
    
  } catch (error) {
    console.error('❌ Database connection failed!\n');
    console.error('Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check if Supabase project is active (not paused)');
    console.error('2. Verify password in .env file');
    console.error('3. Make sure you replaced [YOUR-PASSWORD] with actual password');
  } finally {
    await prisma.$disconnect();
  }
}

main();