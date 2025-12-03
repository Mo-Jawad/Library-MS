import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

dotenv.config({
    path: './.env'
})

let blacklistedTokens = []

function authorizeRole(role) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    const realToken = token.split(" ")[1]

    if (!realToken || blacklistedTokens.includes(realToken)) { 
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


export function verifyLogin(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const realToken = token.split(" ")[1]
  if (!realToken) {
    return res.status(403).json({ message: "No token provided" });
  }

  if (blacklistedTokens.includes(realToken)) {
    return res.status(401).json({ message: "Token is invalid (logged out)" });
  }

  try {
    const user = jwt.verify(realToken, process.env.SECRET_KEY);
    req.user = user; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


  export const logoutFunc = (req, res) => {
    const token = req.headers["authorization"];
  if (token) {
    blacklistedTokens.push(token); // mark token invalid
  }
  res.json({ message: "Logged out successfully" });

}


export default authorizeRole;
