const db = require("../models");

module.exports = {

  findUsers: function (req, res) {
    db.User
      .find({
        name: { $regex: req.params.name, $options: "i" },
        include: { models: db.Deck }
      })
      .populate("deck")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // findById: function (req, res) {
  //   db.User
  //     .findOne({_id: req.params.id}
  //       // include: {models: db.Deck}
  //     ).populate("deck").populate("card").then(dbModel => {
  //       console.log(dbModel)
  //       res.json(dbModel)
  //     }).catch(err => res.status(422).json(err));
  // },

  findById: function (req, res) {
    db.User
      .findOne({ _id: req.params.id }
        // include: {models: db.Deck}
        ).populate("deck").populate("cards").then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      }).catch(err => res.status(422).json(err));
  },

  changeAvatar: function (req, res) {
    db.User
    .updateOne({ _id: req.body.user}, {avatar: req.body.avatar })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },

  addUser: function (req, res) {
    console.log(req.body)
    const user = new db.User({ name: req.body.username, password: req.body.password })
    user.password = user.generateHash(req.body.password)
    console.log(user)

    db.User
      .create(user)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User
      .find({ name: req.body.name })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  findUserDecks: function (req, res) {
    //console.log("---------findUserDeck----------")
    //console.log(req)
    db.User
      .find({ _id: req.user._id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}