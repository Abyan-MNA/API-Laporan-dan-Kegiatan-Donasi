const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Akses token dibutuhkan. Silahkan login dengan metode POST https://donation-api-auth.vercel.app/auth/login untuk mendapatkan token" });
  }
  try {
    const response = await axios.get('https://donation-api-auth.vercel.app/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      req.user = response.data.data;
      next();
    } else {
      return res.status(403).json({ message: "Token tidak valid/sah" });
    }
  }
  catch (error) {
    console.error("Galat/error memverifikasi token:", error.message);
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(401).json({ message: "Token sudah kadaluarsa, silahkan login lagi di https://donation-api-auth.vercel.app/auth/login" });  
    }
    return res.status(500).json({ message: "Gagal memverifikasi token" });
  }
};

module.exports = authenticateToken;
