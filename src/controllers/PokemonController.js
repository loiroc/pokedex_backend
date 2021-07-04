const api = require("../config/api");

class PokemonController {
  async getPokemon(req, res) {
    var pokemonArr = [];
    new Promise((resolve) => {
      for (let i = 1; i <= 150; i++) {
        api
          .get(`/pokemon/${i}`)
          .then((results) => {
            pokemonArr.push({
              id: i,
              name: results.data.name,
              image: `https://pokeres.bastionbot.org/images/pokemon/${i}.png`,
              height: results.data.height,
              weight: results.data.weight,
              stats: results.data.stats.map((s) => {
                return { stat: s.stat.name, lvl: s.base_stat };
              }),
              types: results.data.types.map((type) => {
                return type.type.name;
              }),
            });
            if (i === 150) {
              resolve();
            }
          })
          .catch(() => {
            return res.status(400);
          });
      }
    }).then(() => {
      setTimeout(() => {
        return res.status(200).send(
          pokemonArr.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          })
        );
      }, 3000);
    });
  }

  async getWeaknesses(req, res) {
    var type = req.params.type;
    api
      .get(`/type/${type}`)
      .then((results) => {
        return res.send(results.data.damage_relations.double_damage_from);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  }
}

module.exports = new PokemonController();
