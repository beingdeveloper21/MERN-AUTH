import jwt from 'jsonwebtoken';

// Middleware to check if the user is authenticated using JWT token from cookies
const userAuth = async (req, res, next) => {
  const token = req.cookies.token;  // Get token from cookies

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the JWT token
    if (decoded.id) {
      req.body.userId = decoded.id;  // Attach the user id to the request
      next();  // Proceed to the next middleware/route
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
