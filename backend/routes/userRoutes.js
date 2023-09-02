const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.route("/add").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const encryptedPass = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new User({
      email,
      password: encryptedPass,
    });

    await newUser.save();

    res.json({ message: "User added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const sessUser = {
      id: user.id,
      email: user.email,
    };

    req.session.user = sessUser;

    res.status(200).json({
      success: true,
      message: "Login successful",
      session: req.session.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
