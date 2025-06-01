const axios = require("axios");

// Autentikasi token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({message: "Akses tidak diizinkan / Forbidden access. - Please login at https://donation-api-auth.vercel.app/auth/login with username and password in JSON body request (if use API with POST HTTP method) or integrated website for get token access"});

  try {
    const response = await axios.get('https://donation-api-auth.vercel.app/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data.success) {
      return res.status(403).json({message: "Token tidak valid / Token not valid"});
    }

    req.user = response.data.data; // Data? User Data
    next();
  } catch (error) {
    console.error("Token has expired or something from auth?");
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(401).json({message: "Token kadaluarsa / Expired token -- Please login again at https://donation-api-auth.vercel.app/auth/login for get token"})
    }
    return res.status(500).json({message: "Verifikasi token gagal / Failed verify or validate token"});
  }
}

// Melihat tingkatan/bagian/role dalam user/pengguna
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!Array.isArray(allowedRoles)) {
      throw new Error("allowedRoles berupa array seperti [\"role_example1\", '...']");
    }
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        status_info: "Error",
        message: `Sayangnya tidak mendapat akses / Unfortunely, don't have access`
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        status_info: "Error",
        message: `Sayangnya akses ini hanya untuk ${allowedRoles.join(' atau ')} / Unfortunely, this access only for ${allowedRoles.join(' or ')}`
       });
    }
    next();
  }
}

module.exports = { authenticateToken, authorizeRole };