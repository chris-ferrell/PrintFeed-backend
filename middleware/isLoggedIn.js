require("dotenv").config();
const jwt = require("jsonwebtoken");

const isUserLoggedIn = async (req, res, next) => {
  try {
    // check if the token is in the cookies
    const { token = false } = req.cookies; // getting the token and set to false 
    if (token) { // if the token exist give it a truthy value
      // verify token
      const payload = await jwt.verify(token, process.env.SECRET); // extract the data from the payload
      // add payload to request
      req.payload = payload;
      // move on
      next();
    } else {
      throw "Not Logged In";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = isUserLoggedIn;