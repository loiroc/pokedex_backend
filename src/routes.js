const router = require("express").Router();

const authMiddleware = require("./auth");

const AuthenticationController = require("./controllers/AuthenticationController");
router.post("/authenticate", AuthenticationController.authentication);

// private routes
router.use(authMiddleware);

const PokemonController = require("./controllers/PokemonController");
router.get("/pokemon", PokemonController.getPokemon);
router.get("/weaknesses/:type", PokemonController.getWeaknesses);

module.exports = router;
