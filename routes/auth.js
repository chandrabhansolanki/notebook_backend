const User = require("../models/User");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "MYNAMEISCHANDRABHANSINGHSOLANKI";
var fetchuser = require("../middleware/fetchuser");

//Route:1 Create a User using :POST "/api/auth/createuser" Doesn't required Auth
router.post(
  "/createuser",
  [
    // name of the user atleast 5 charcter
    body("name", "Enter a name atleast 5 charcter").isLength({ min: 5 }),
    // email must be an email
    body("email", "Enter a valid Email").isEmail(),
    // password must be at least 5 charcter long
    body("password", "Enter a password atleast 5 charcter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    try {
      // check whether the user exists already or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already Exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(data);
      // console.log(authtoken);

      res
        .status(200)
        .send({ token: authtoken, success: true, message: "User is Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
    }

    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error: "please Enter a valid email"})
    // })

    // const user = User(req.body)
    // user.save()
    // res.send(req.body)
  }
);

//Route:2 Authenticate user   :POST "/api/auth/login" Doesn't required Auth

router.post(
  "/login",
  [
    // email must be an email
    body("email", "Enter a valid Email").isEmail(),
    // password must be at least 5 charcter long
    body("password", "Enter a valid password").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // if there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({
            error: "please try to login with right credential",
            success: false,
          });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            error: "please try to login with right credential",
            success: false,
          });
      }

      const datas = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(datas, JWT_SECRET);
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        date: user.date,
        token:authtoken
      };

      res
        .status(200)
        .send({
          data,
          success: true,
          message: `${user?.name} Logged In Successfully`,
        });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route:3 get logedin user details using :POST "/api/auth/getuser" LoginRequired

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send({ user, success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
