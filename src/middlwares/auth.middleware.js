import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
    //IMPORTANT LINE (BUG FIX)
    const token = authHeader.split(" ")[1];

    // verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user data

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "INVALIED TOKEN",
    });
  }
};

export { authMiddleware };
