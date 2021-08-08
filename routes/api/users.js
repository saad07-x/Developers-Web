const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const jwt = require('jsonwebtoken');
const User = require("../../models/User");

//@route    POST api/users
//@desc     Test Route
//@access   Public - By public it means you don't need any token to access this. (e.g. no password required)

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Enter a password with 7 or more characters").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //400 is for bad request. BY default it's 200.
    }

    const { name, email, password } = req.body;
    try {
      //if user already exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //get gravator
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //This creates a new user object.
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return json webtoken ->
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err,token) => {
        if (err) throw err;
        res.json({ token  })
      });
    } 
    
    
    catch (err) {
      console.error(err.message); 
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
