const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Generate a JWT token for authentication
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - isAdmin
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               isAdmin:
 *                 type: boolean
 *                 description: Indicates whether the user is an admin
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
async function generateToken(req, res) {
  try {
    const { email, password, isAdmin } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @swagger
 * All routes that need user or admin verification:
 *   get:
 *     summary: Verify user token
 *     description: Verifies the user token provided in the Authorization header.
 *     tags:
 *       [Authentication]
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: User token in the format "Bearer {token}"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Token is valid, and user is authorized.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have the required privileges.
 */
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

/**
 * @swagger
 * Used in all routes that need admin verification only:
 *   get:
 *     summary: Verify admin privileges
 *     description: Verifies if the user associated with the provided token has admin privileges.
 *     tags:
 *       [Authentication]
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: User token in the format "Bearer {token}"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User has admin privileges.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have admin privileges.
 */
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
