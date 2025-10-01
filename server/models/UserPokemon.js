const mongoose = require("mongoose");

const UserPokemonSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: String,
  sprite: String,
  type: String,
});

UserPokemonSchema.set("toJSON", {
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

module.exports = mongoose.model("UserPokemon", UserPokemonSchema);
