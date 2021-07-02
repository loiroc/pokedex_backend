const router = require("express").Router();
const jwt = require('jsonwebtoken');

const authMiddleware = require('./auth');

router.post('/authenticate', (req, res) => {

  if(!req.body.username || !req.body.password) {
    res.status(500).json({message: 'Username and password required'});
  }

  // this is hardcorded only for test pourpose
  if(req.body.email === 'admin' && req.body.password === 'admin'){
    const user = {
      id: '44db268a-74d4-4c15-9384-fe4707b91af3',
      name: 'Default User',
    };
  
    return res.json({
      user,
      token: jwt.sign(user, 'PRIVATEKEY', {expiresIn: 604800}),
    });
  }

  res.status(500).json({message: 'Wrong combination of username or password'});

});

router.use(authMiddleware);

const PokemonController = require("./controllers/PokemonController");
router.get('/pokemon', PokemonController.get);

module.exports = router;