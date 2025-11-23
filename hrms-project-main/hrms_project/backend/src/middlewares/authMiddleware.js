const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.authMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = { userId: payload.userId, orgId: payload.orgId };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
