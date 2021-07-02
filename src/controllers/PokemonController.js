class PokemonController {
    async get(req, res) {
      try {
        //const sql = await database.query("SELECT * FROM costumers");
        //if (sql[0].length > 0) return res.send(sql[0]);
        return res
          .status(400)
          .json({ message: "There is no costumer registred yet!" });
      } catch (err) {
        return res.status(400);
      }
    }
  }
  
  module.exports = new PokemonController();