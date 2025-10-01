const express = require("express");
const router = express.Router();
const {
  getQuest,
  generateQuest,
  attackQuest,
  getUserPokemons,
} = require("../controllers/questController");
const { get } = require("mongoose");

router.get("/", getQuest);
router.post("/generate", generateQuest);
router.post("/attack", attackQuest);
router.get("/pokemons", getUserPokemons);

module.exports = router;
