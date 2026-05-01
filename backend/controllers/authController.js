const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Toate câmpurile sunt obligatorii",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Există deja un utilizator cu acest email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Utilizator creat cu succes",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la înregistrare",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Emailul și parola sunt obligatorii",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email sau parolă incorectă",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Email sau parolă incorectă",
      });
    }

    res.status(200).json({
      message: "Login reușit",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la login",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};