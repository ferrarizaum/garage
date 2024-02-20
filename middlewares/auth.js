const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function generateToken(req, res) {
  try {
    const { email, password, isAdmin } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const name = user.name;
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

    res.json({ token, name });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    if (req.user.isAdmin || req.user) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  });
}

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      const user = decoded.user;
      if (user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    }
  });
}

module.exports = { verifyToken, generateToken, verifyAdmin };
