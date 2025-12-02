import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

dotenv.config({
    path: './.env'
})

function authorizeRole(role) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    const realToken = token.split(" ")[1]

    if (!realToken) { 
        return res.sendStatus(403).json({
        message: 'Login first'
    });
    }
    
    try {
      const user = jwt.verify(realToken, process.env.SECRET_KEY);
      if (user.role !== role) {
        return res.status(401).json({ message: "not eligible to entry" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  };


export default authorizeRole;
