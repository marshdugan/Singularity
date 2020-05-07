const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Deck
      .find()
      .populate("card")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Deck
      .findOne({_id:req.params.id})
      .populate("card")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  buildDeck: function (req, res) {
    db.Deck
      .create(req.body.newDeck)
      .then(({_id}) => {
        db.User.findOneAndUpdate({_id: req.body.userID}, {$push: {deck: _id}}, {new: true}).then(dbModel => {
          res.json(dbModel);
        }).catch(err => {
          console.log(err);
          res.status(422).json(err);
        })
      })
      .catch(err => res.status(422).json(err));
  }
};