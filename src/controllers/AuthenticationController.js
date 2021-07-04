const jwt = require("jsonwebtoken");

class AuthenticationController {
  async authentication(req, res) {
    // this is hardcorded only for test pourpose
    if (req.body.user === "admin" && req.body.password === "admin") {
      const user = {
        id: "44db268a-74d4-4c15-9384-fe4707b91af3",
        name: "Default User",
      };

      return res.json({
        user,
        token: jwt.sign(user, "PRIVATEKEY", { expiresIn: 604800 }),
      });
    } else {
      res
        .status(500)
        .json({ message: "Wrong combination of username or password" });
    }
  }
}

module.exports = new AuthenticationController();
