const mongoose = require("mongoose");

const QuestPokemonSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: String,
  sprite: String,
  type: String,
  hp: Number,
  maxHp: Number,
});

QuestPokemonSchema.set("toJSON", {
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

modulule.exports = mongoose.model("QuestPokemon", QuestPokemonSchema);
