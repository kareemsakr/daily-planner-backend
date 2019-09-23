const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "secret", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "error must be logged in." });
    }

    const { id } = payload;
    const user = await User.findById(id);
    console.log(payload);
    req.user = user;
    next();
  });
};

module.exports = requireAuth;
