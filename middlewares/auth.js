const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const bearer = req.headers["Authorization"] || req.headers["authorization"];
  if (!bearer) {
    res.status(403);
    throw new Error("Unauthorized");
  }
  const accessToken = bearer.split(" ")[1];
  if (!accessToken) {
    res.status(403);
    throw new Error("Unauthorized");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req._id = payload._id;
    next();
  } catch (e) {
    res.status(403);
    throw new Error("Unauthorized");
  }
};

module.exports = {
  verifyJWT,
};
