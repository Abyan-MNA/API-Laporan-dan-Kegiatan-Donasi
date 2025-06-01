const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect(); // <-- Tambahkan await
    console.log(`Database has connected`);
  } catch (error) {
    console.error('Failed connect database:', error.message);

    // Tampilkan error code untuk debugging
    if (error.code) {
      console.error(`Code error: ${error.code}`);
    }

    // Hentikan proses jika koneksi gagal
    process.exit(1);
  }
}

module.exports = { prisma, connectDB };