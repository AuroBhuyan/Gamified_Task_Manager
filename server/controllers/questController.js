const QuestPokemon = require("../models/QuestPokemon");
const UserPokemon = require("../models/UserPokemon");
const Task = require("../models/Task");
const User = require("../models/User");

const getUserId = (req) => {
  return req.headers["x-user-id"] || req.body.userId || req.query.userId;
};

const generateQuest = async (req, res) => {
  const userId = getUserId(req);
  if (!userId)
    return res.status(400).json({
      error: "userId required",
    });

  const existingQuest = await QuestPokemon.findOne({ userId });
  if (existingQuest) {
    return res.status(400).json({
      error: "You Already Have An Active Quest",
      quest: existingQuest,
    });
  }

  const pokeId = Math.floor(Math.random() * 151) + 1;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0", // looks like browser
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();

    const hpStat = data.stats.find((s) => s.stat.name === "hp").base_stat;
    const maxHp = hpStat;

    const quest = await QuestPokemon.create({
      userId,
      name: data.name,
      sprite: data.sprites.front_default,
      type: data.types[0].type.name,
      hp: maxHp,
      maxHp,
    });

    res.json({
      message: "New Pokemon Arrived",
      quest,
    });
  } catch (err) {
    res.status(500).json({
      error: "No Pokemon Found Try Later :( ",
      details: err.message,
    });
  }
};

const getQuest = async (req, res) => {
  const userId = getUserId(req);
  const quest = await QuestPokemon.findOne({ userId });
  res.json(quest || null);
};

const attackQuest = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });

  // --- Get user and accumulated damage ---
  let user = await User.findOne({ userId });
  if (!user || !user.accumulatedDamage || user.accumulatedDamage <= 0) {
    return res.status(400).json({ error: "No accumulated attack damage" });
  }

  let damageToApply = user.accumulatedDamage;
  user.accumulatedDamage = 0; // reset after attacking

  // --- Get current quest ---
  let quest = await QuestPokemon.findOne({ userId });
  if (!quest) return res.status(404).json({ error: "No Active Quest" });

  let captured = false;
  let remainingHp = quest.hp;
  let capturedPokemonData;

  // Apply damage
  remainingHp -= damageToApply;

  if (remainingHp <= 0) {
    capturedPokemonData = {
      name: quest.name,
      sprite: quest.sprite,
      type: quest.type,
    };
    await UserPokemon.create({
      userId,
      ...capturedPokemonData,
    });
    await quest.deleteOne();
    captured = true;

    // Calculate leftover damage for next quest
    const leftoverDamage = Math.abs(remainingHp);
    if (leftoverDamage > 0) {
      // If another quest exists, apply leftover damage
      let nextQuest = await QuestPokemon.findOne({ userId });
      if (nextQuest) {
        nextQuest.hp -= leftoverDamage;
        if (nextQuest.hp <= 0) {
          // Capture next quest recursively (simplified for MVP)
          await UserPokemon.create({
            userId,
            name: nextQuest.name,
            sprite: nextQuest.sprite,
            type: nextQuest.type,
          });
          await nextQuest.deleteOne();
        } else {
          await nextQuest.save();
        }
      } else {
        // Store leftover damage for future quest
        user.accumulatedDamage = leftoverDamage;
      }
    }
    remainingHp = 0;
  } else {
    quest.hp = remainingHp;
    await quest.save();
  }

  await user.save();

  res.json({
    captured,
    damage: damageToApply,
    pokemon: captured
      ? capturedPokemonData
      : {
          name: quest.name,
          sprite: quest.sprite,
          type: quest.type,
          hp: remainingHp,
          maxHp: quest.maxHp,
        },
    progress: captured
      ? 100
      : Math.round(((quest.maxHp - remainingHp) / quest.maxHp) * 100),
  });
};

const getUserPokemons = async (req, res) => {
  const userId = getUserId(req);
  const pokemons = await UserPokemon.find({ userId });
  res.json(pokemons);
};

module.exports = {
  generateQuest,
  getQuest,
  attackQuest,
  getUserPokemons,
};
