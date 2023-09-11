const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// Login route that generates jwt
async function generateToken(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, "secret_key", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

function verifyToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the token is valid, you can access the decoded information
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  });
}

module.exports = { verifyToken, generateToken };
