const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { prisma } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { json } = require("express");

// this post route creates a new user:
router.post(
  // validate input
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6"
    ).isLength({ min: 6 }),
    check(
      "username",
      "Please input a username with a min length of 6"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, username } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // validate that the user doesn't already exist
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "This user already exists" }],
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // create json web token and referncing environment variable for security purposes
    const token = await JWT.sign(newUser, process.env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: 3600000,
    });

    // return JWT
    return res.json({
      user: newUser,
      token,
    });
  }
);

// validate that the user exists
// validate the password
// rturn a JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: "Ivalid credentials" }],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: "Ivalid credentials" }],
    });
  }

  const userPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const token = await JWT.sign(
    userPayload,
    process.env.JSON_WEB_TOKEN_SECRET,
    { expiresIn: 3600000 }
  );

  // return JWT
  return res.json({
    user: userPayload,
    token,
  });
});

module.exports = router;
