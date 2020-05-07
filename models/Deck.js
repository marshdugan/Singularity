const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckSchema = new Schema({
  name: String,
  numberOfCards: {
    type: Number,
    default: 30
  },
  card: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'gameCard'
    }
  ],
});

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;