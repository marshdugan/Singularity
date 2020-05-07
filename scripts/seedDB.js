const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://" + process.env.DBUSER + ":" + process.env.DBPASS + "@ds129018.mlab.com:29018/heroku_g9r80cft"
);
// Cards, types, units, 'spells', gear/equipment
//need costs, rule text
const gameCardSeed = [
  {
    name: "Thug",
    image: "thug.jpg",
    attack: 3,
    HP: 5,
    type: 'Unit',
    cost: 3,
    class: 'Tech'
  },
  {
    name: "Sniper",
    image: "sniper.jfif",
    attack: 6,
    HP: 3,
    type: 'Unit',
    cost: 5,
    class: 'Tech'
  },
  {
    name: "Mage",
    image: "mage.jpg",
    attack: 8,
    HP: 1,
    type: 'Unit',
    cost: 3,
    class: 'Arcane'
  }, {
    name: "Law Enforcement",
    image: "lawenforcement.jpg",
    attack: 1,
    HP: 8,
    type: 'Unit',
    cost: 2,
    class: 'Tech'
  }, {
    name: "Drone",
    image: "drone.jpg",
    attack: 1,
    HP: 1,
    type: 'Unit',
    cost: 1,
    class: 'Tech'
  }, {
    name: "Robot",
    image: "robot.jpg",
    attack: 2,
    HP: 5,
    type: 'Unit',
    cost: 2,
    class: 'Tech'
  }, {
    name: "Hacker",
    image: "hacker.png",
    attack: 6,
    HP: 2,
    type: 'Unit',
    cost: 4,
    class: 'Tech'
  }, {
    name: "Familiar",
    image: "familiar.jpg",
    attack: 1,
    HP: 5,
    type: 'Unit',
    cost: 2,
    class: 'Arcane'
  }, {
    name: "Assassin",
    image: "assassin.png",
    attack: 5,
    HP: 1,
    type: 'Unit',
    cost: 2,
    class: 'Arcane'
  }, {
    name: "Knight",
    image: "knight.jpg",
    attack: 3,
    HP: 6,
    type: 'Unit',
    cost: 4,
    class: 'Arcane'
  }, {
    name: "Demon",
    image: "demon.jpg",
    attack: 8,
    HP: 8,
    type: 'Unit',
    cost: 6,
    class: 'Arcane'
  }, {
    name: "Sentry",
    image: "sentry.png",
    attack: 7,
    HP: 8,
    type: 'Unit',
    cost: 6,
    class: 'Tech'
  }, {
    name: "Rogue AI",
    image: "rogueAI.jpg",
    attack: 10,
    HP: 5,
    type: 'Unit',
    cost: 6,
    class: 'Tech'
  }, {
    name: "Mage for Hire",
    image: "mageforhire.jpg",
    attack: 8,
    HP: 2,
    type: 'Unit',
    cost: 4,
    class: 'Arcane'
  }, {
    name: "Warlock",
    image: "warlock.jpg",
    attack: 6,
    HP: 1,
    type: 'Unit',
    cost: 3,
    class: 'Arcane'
  }, {
    name: "Private Security",
    image: "privatesecurity.jpg",
    attack: 2,
    HP: 2,
    type: 'Unit',
    cost: 2,
    class: 'Tech'
  }, {
    name: "Tripwire",
    image: "tripwire.jpg",
    attack: 1,
    HP: 5,
    type: 'Unit',
    cost: 2,
    class: 'Tech',
    mechanic: 'defend only, damage on death'
  }, {
    name: "Wards",
    image: "wards.jpg",
    attack: 1,
    HP: 5,
    type: 'Unit',
    cost: 2,
    class: 'Arcane',
    mechanic: 'defend only. damage on death'
  }, {
    name: "Merc",
    image: "merc.jpg",
    attack: 3,
    HP: 3,
    type: 'Unit',
    cost: 3,
    class: 'Tech'
  }, {
    name: "Summoner",
    image: "summoner.jpg",
    attack: 1,
    HP: 1,
    type: 'Unit',
    cost: 3,
    class: 'Arcane',
    mechanics: 'Summons 1/1 unit every turn'
  }, {
    name: "Developer",
    image: "developer.jpg",
    attack: 1,
    HP: 1,
    type: 'Unit',
    cost: 3,
    class: 'Tech',
    mechanics: 'summons 1/1'
  }, {
    name: "Unstable Familiar",
    image: "unstablefamiliar.jpg",
    attack: 4,
    HP: 1,
    type: 'Unit',
    cost: 2,
    class: 'Arcane',
    mechanics: 'lasts 1 turn'
  }, {
    name: "Vaporware",
    image: "vaporware.jpg",
    attack: 4,
    HP: 1,
    type: 'Unit',
    cost: 2,
    class: 'Tech',
    mechanics: 'lasts 1 turn'
    //lasts 1 turn
  }, {
    name: "Turret",
    image: "turret.jpg",
    attack: 5,
    HP: 1,
    type: 'Unit',
    cost: 3,
    class: 'Tech',
    mechanics: 'Defender'
    //can only defend
  }, {
    name: "Cancel",
    image: "cancel.jpg",
    type: 'Spell',
    cost: 2,
    class: 'Arcane',
    mechanics: 'counter'
    //counter magic, cost 2
  }, {
    name: "Stall",
    image: "delay.jpg",
    type: 'Spell',
    cost: 2,
    class: 'Tech',
    mechanics: 'counter'
    //counter tech, cost 2

  }, {
    name: "Firebolt",
    image: "firebolt.jpg",
    //Magic Spell cost 1, 1 dmg   
    type: 'Spell',
    cost: 1,
    class: 'Arcane',
    mechanics: ' 1 dmg '
  }, {
    name: "Static",
    image: "static.jpg",
    type: 'Spell',
    cost: 1,
    class: 'Tech',
    mechanics: '1 dmg'
    //Tech spell cost 1, 1 dmg

  }, {
    name: "Fireball",
    image: "fireball.jpg",
    type: 'Spell',
    cost: 3,
    class: 'Arcane',
    mechanics: '2 dmg to all'
    //Magic spell cost 3, 2 dmg to all

  }, {
    name: "Heal",
    image: "heal.jpg",
    type: 'Spell',
    cost: 2,
    class: 'Arcane',
    mechanics: 'cost 2'
    // Magic spell, cost 2, heal 5

  }, {
    name: "Scry",
    image: "scry.jpg",
    type: 'Spell',
    cost: 1,
    mechanics: "look at X opponent's cards"
    //Magic spell, look at X opponent's cards, cost 1+x 

  }, {
    name: "Hack",
    image: "hack.jpg",
    type: 'Spell',
    cost: 4,
    class: 'Tech',
    mechanics: "look at opponent's hand"
    //Tech spell, look at opponent's hand, cost 4

  }, {
    name: "Resummon",
    image: "resummon.jpg",
    type: 'Spell',
    cost: 2,
    class: 'Arcane',
    mechanics: 'unit out of discard, cost 2+unit cost'
    // magic spell, unit out of discard, cost 2+unit cost

  }, {
    name: "Interference",
    image: "interference.jpg",
    type: 'Spell',
    cost: 1,
    class: 'Tech',
    mechanics: 'raises cost of magic by 1 for 1 round'
    // Tech spell, raises cost of magic by 1 for 1 round

  }, {
    name: "Teleport",
    image: "teleport.jpg",
    type: 'Spell',
    cost: 1,
    class: 'Tech',
    mechanics: "remove unit to owner's hand"
    // Tech power, remove unit to owner's and, cost 1

  }, {
    name: "Whirlwind",
    image: "whirlwind.jpg",
    type: 'Spell',
    cost: 4,
    class: 'Arcane',
    mechanics: "return random number of units to owner's hand"
    //Magic spell, return random number of units to owner's hand, cost 4

  }, {
    name: "Sword",
    image: "sword.jpg",
    type: 'Equipment',
    cost: 2,
    class: 'Arcane',
    mechanics: '+1 attack'
    //equipment, +1 attack, cost 2

  }, {
    name: "Shield",
    image: "shield.png",
    type: 'Equipment',
    cost: 2,
    class: 'Arcane',
    mechanics: '+1 hp'
    //equipment, +1 hp, cost 2

  }, {
    name: "Rifle",
    image: "rifle.jpg",
    type: 'Equipment',
    cost: 3,
    class: 'Tech',
    mechanics: '+2 attack'
    //equipment +2 attack, cost 3

  }, {
    name: "Pistol",
    image: "pistol.jpg",
    type: 'Equipment',
    cost: 3,
    class: 'Tech',
    mechanics: '+1 attack'
    //equipment +1 attack, cost 2

  }, {
    name: "Medpack",
    image: "medpack.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'equipment +2hp'
    //equipment +2hp, cost 4

  }, {
    name: "Health Potion",
    image: "healthpotion.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Arcane',
    mechanics: 'equipment +2hp'
    //equipment +2hp, cost 4

  }, {
    name: "Staff",
    image: "staff.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Arcane',
    mechanics: 'equipment +1 hp +1 attack'
    //equipment +1 hp +1 attack, +2hp vs magic, cost 4

  }, {
    name: "Datapad",
    image: "datapad.png",
    type: 'Equipment',
    cost: 5,
    class: 'Tech',
    mechanics: 'equipment reduce cost of tech spells by 1'
    // equipment reduce cost of tech spells by 1, cost 5

  }, {
    name: "Totem",
    image: "totem.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Arcane',
    mechanics: 'global equipment, increases magic damage by 1'
    // global equipment, increases magic damage by 1 cost 4

  }, {
    name: "Adrenals",
    image: "adrenal.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'global eq, increases tech damage by 1'
    // global eq, increases tech damage by 1 cost 4

  }, {
    name: "Hideout",
    image: "hideout.jpg",
    type: 'Equipment',
    cost: 6,
    class: 'Tech',
    mechanics: 'global equipment, protect one unit after combat'
    // global equipment, protect one unit after combat cost cost 6

  }, {
    name: "Sanctum",
    image: "sanctum.jpg",
    type: 'Equipment',
    cost: 6,
    class: 'Arcane',
    mechanics: 'global equipment, protect one unit after combat'
    // global equipment, protect one unit after combat cost 6

  }, {
    name: "Ambulance",
    image: "ambulance.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'return one unit to hand after combat'
    // return one unit to hand after combat cost 4

  }, {
    name: "Illusion",
    image: "illusion.png",
    type: 'Equipment',
    cost: 2,
    class: 'Arcane',
    mechanics: 'swap out a unit for another unit before combat begins'
    // swap out a unit for another unit before combat begins, cost new unit - old unit + 2

  }, {
    name: "Shield Spell",
    image: "shieldspell.jpg",
    type: 'Equipment',
    cost: 2,
    class: 'Arcane',
    mechanics: 'protect player after combat'
    // magic, protect player after combat, cost 2

  }, {
    name: "Mail",
    image: "mail.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Arcane',
    mechanics: 'decrease damage to player by 1'
    // decrease damage to player by 1, cost 4

  }, {
    name: "Body Armor",
    image: "bodyarmor.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'decrease damage to player by 1'
    // decrease damage to player by 1, cost 4

  }, {
    name: "Force Field",
    image: "forcefield.jpg",
    type: 'Equipment',
    cost: 2,
    class: 'Tech',
    mechanics: 'tech protect player after combat'
    // tech protect player after combat, cost 2

  }, {
    name: "Short Circuit",
    image: "shortcircuit.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'opponent discards 2 cards'
    // opponent discards 2 cards, cost 4

  }, {
    name: "Mass Recall",
    image: "massrecall.jpg",
    type: 'Equipment',
    cost: 8,
    class: 'Arcane',
    mechanics: 'return all units to hand'
    // return all units to hand, cost 8

  }, {
    name: "Distraction",
    image: "distraction.jpg",
    type: 'Equipment',
    cost: 3,
    class: 'Tech',
    mechanics: 'target unable to block this turn'
    // target unable to block this turn, cost 3

  }, {
    name: "Flashbang",
    image: "flashbang.png",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'arget unable to attack this turn'
    // target unable to attack this turn, cost 4

  }, {
    name: "Entrench",
    image: "entrench.jpg",
    type: 'Equipment',
    cost: 5,
    class: 'Tech',
    mechanics: 'units gain 2 defense this turn'
    // units gain 2 defense this turn, cost 5

  }, {
    name: "Grenade",
    image: "grenade.jpg",
    type: 'Equipment',
    cost: 5,
    class: 'Tech',
    mechanics: '1 damage to all opponent units'
    // 1 damage to all opponent units, cost 5

  }, {
    name: "Armory",
    image: "armory.jpg",
    type: 'Equipment',
    cost: 4,
    class: 'Tech',
    mechanics: 'equipment cards cost 1 less, cost 4'
    // equipment cards cost 1 less, cost 4
  },
  {
    name: "Power Core",
    image: "powerCore.jpg",
    type: 'Resource',
    cost: 0,
    class: 'Tech'
  },
  {
    name: "Soul Stone",
    image: "soulStone.jpg",
    type: 'Resource',
    cost: 0,
    class: 'Arcane'
  }
];

// const userSeed = [
//   {
//     name: "David",
//     password: "1234",
//   },
//   {
//     name: "John",
//     password: "5678",
//   }
// ];

// const deckSeed = [
//   {
//     name: "Sample1",
//     numberOfCards: 4,
//     card : ["5e95dde9f9956303a8f0459a"]
//   },
//   {
//     name: "Sample2",
//   }
// ];

// db.User
//   .remove()
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

db.gameCard
  .remove({})
  .then(() => db.gameCard.collection.insertMany(gameCardSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// db.Deck
  // .remove()
  // .then(() => db.Deck.collection.insertMany(deckSeed))
  // .then(data => {
  //   console.log(data.result.n + " records inserted!");
  //   process.exit(0);
  // })
  // .catch(err => {
  //   console.error(err);
  //   process.exit(1);
  // });