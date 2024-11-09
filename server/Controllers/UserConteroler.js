const client = require("../config/databaseConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);
    const userAvailable = data.rows;
    if (userAvailable.length !== 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    }

    if (!name || !email || !password) {
      returnres.status(400).json({
        error: "all fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    const user = {
      name,
      email,

      password: hashedPassword,
    };

    var flag = 1;

    client.query(
      `INSERT INTO users  (username, email, password) VALUES ($1,$2,$3);`,
      [user.name, user.email, user.password],
      (err) => {
        if (err) {
          flag = 0;
          console.error(err);
          return res.status(500).json({
            error: "something went wrong",
          });
        } else {
          flag = 1;
          res.status(200).json("User Created Successfully");
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Database error while registring user!",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {
          const token = jwt.sign(
            {
              email: email,
              id: user[0].id,
              name: user[0].name,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            message: "User signed in!",
            token: token,
          });
        } else {
          if (result != true)
            res.status(400).json({
              error: "Enter correct password or email!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

module.exports = { loginUser, registerUser };
