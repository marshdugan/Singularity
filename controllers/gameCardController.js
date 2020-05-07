const db = require("../models");

// Defining methods for the gameCardController
module.exports = {

  findCards: function(req, res) {
    db.gameCard
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.gameCard
      .findOne({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};