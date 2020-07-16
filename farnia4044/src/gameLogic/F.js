import {
  systemNames,
  femaleNames,
  maleNames,
  letters,
  systemBodies,
} from "./lib";
import System from "./System";
import Encounter from "./Encounter";
import Farnian from "./Farnian";

const resources = ["food", "fuel", "fitness"];
const deathCauses = {
  food: [
    "starved to death",
    "died from malnutrition",
    "died of starvation",
    "died because they didn't get enough vitamins",
    "died from lack of food",
    "died of hunger",
  ],
  fitness: [
    "offed themselves",
    "jumped out the airlock",
    "died from drinking chemicals",
    "died of exposure while streaking on an asteroid",
    "died of heart attack",
    "died from extreme stress",
    "was killed by an arch-nemesis",
    "died horribly... don't ask",
    "",
  ],
  accident: [
    "fell into the food harvester",
    "burned to death in a fuel accident",
    "died from life support failure.",
    "died from a helmet crack during EVA.",
    "died while harvesting resources.",
    "died from internal bleeding",
    "was crushed to death by a docking module",
  ],
};

const getRandomResource = function () {
  let chosen = resources[getRandom(resources.length - 1)];
  return chosen;
};

const getRandom = function (max = 5) {
  let random = Math.floor(Math.random() * (max + 1));
  //    console.log(random)
  return random;
};

const successCheck = function (successRatePct = 50) {
  let roll = getRandom(100);
  return roll <= successRatePct;
};

const generateSystem = function (number = 1) {
  let systems = [];
  for (let i = 0; i < number; i++) {
    let name = systemNames[getRandom(systemNames.length - 1)];
    let neg = successCheck(75) ? -1 : 1;
    //75% of the time, distance will be negative getting you closer to destination
    let distance = getRandom() * neg;
    // distance === -0 ? (distance = 0) : null;
    systems.push(new System(name, distance));
  }
  return systems;
};

const generateSystemPreview = function (resource) {
  return generateEncounter(resource);
};

const generateEncounter = function (mainResource) {
  let noMain = mainResource === undefined;
  let appendCount = getRandom(3);
  let append = "";
  for (let i = 0; i < appendCount; i++) {
    append += letters[getRandom(letters.length - 1)];
  }

  let name = getRandom(333) + append;
  let type = systemBodies[getRandom(systemBodies.length - 1)];
  let enc = new Encounter(name, type, mainResource);
  let rew = generateReward(mainResource);
  if (noMain === false && rew.amount <= 0) rew.amount = 1;
  enc.rewards.push(rew);
  let bonusRew = successCheck(33);
  if (bonusRew) enc.rewards.push(generateReward());
  //test

  return enc;
};
const generateReward = function (
  resource = getRandomResource(),
  double = false,
  bad = false
) {
  let reward = {};
  let max = 1;
  //    if(double) console.log('doubled' + resource)
  switch (resource) {
    case "food":
      max = 10;
      break;
    case "fuel":
      max = 2;
      break;
    case "fitness":
      max = 2;
      break;
    default:
      max = 1;
  }
  let amount = getRandom(max) + 1;
  amount =
    double && bad
      ? (amount *= -2)
      : double
      ? (amount *= 2)
      : bad
      ? (amount *= -1)
      : amount;

  reward.name = resource;
  reward.amount = amount;

  return reward;
};

const startingFuel = 10;
const startingFood = 35;
const startingFarnians = 10;
const startingFitness = 3;
const difficultyMultiplier = [0, 0.25, 0.33, 0.5];

class Game {
  constructor(difficulty = 0, name = "Forty Forty Four") {
    this.lost = false;
    this.won = false;
    this.message = "";
    this.name = name;
    this.fuelCount = 0;
    this.foodCount = 0;
    this.farniansCount = 0;
    this.fitnessCount = 0;
    this.farniansCrew = [];
    this.choices = [];
    this.foodConsumptionRate = 1;
    this.fuelConsumptionRate = 1;
    this.foodConsumptionModifiers = [{ mod: -0.25, time: 1 }]; //people ate before they left
    this.fuelConsumptionModifiers = [];
    this.fitnessModifiers = [];
    this.crewKey = 10;
    this.distanceLeft = 20;
  }

  initialize(difficulty) {
    this.lost = false;
    this.message = "";
    this.fuelCount = 0;
    this.foodCount = 0;
    this.farniansCount = 0;
    this.fitnessCount = 0;
    this.farniansCrew = [];
    this.choices = [];
    this.foodConsumptionRate = 1;
    this.fuelConsumptionRate = 1;
    this.foodConsumptionModifiers = [{ mod: -0.25, time: 1 }]; //people ate before they left
    this.fuelConsumptionModifiers = [];
    this.fitnessModifiers = [];
    this.crewKey = 10;
    this.distanceLeft = 20;
    this.fuelCount =
      startingFuel -
      Math.floor(startingFuel * difficultyMultiplier[difficulty]);
    this.foodCount =
      startingFood -
      Math.floor(startingFood * difficultyMultiplier[difficulty]);
    this.farniansCount =
      startingFarnians -
      Math.floor(startingFarnians * difficultyMultiplier[difficulty]);
    this.fitnessCount =
      startingFitness -
      Math.floor(startingFitness * difficultyMultiplier[difficulty] * 2);
    for (let i = 0; i < this.farniansCount; i++) {
      let farn = this.generateFarnian();
      farn.key = i;
      this.farniansCrew.push(farn);
    }
  }

  decayFitness(double = false) {
    let extraBaseDecay = double ? 1 : 0;
    let naturalDecay = successCheck(50) ? 0 : 1;

    let additionalDecay = this.getModifedFitnessDecayRate();
    let totalDecay = naturalDecay + extraBaseDecay + additionalDecay;

    this.fitnessCount =
      this.fitnessCount - totalDecay <= -5
        ? -5
        : this.fitnessCount - totalDecay;
    if (this.fitnessCount < -3) this.loseRandomCrew("fitness");
    return totalDecay;
  }

  getModifedFitnessDecayRate() {
    let total = 0;
    if (this.fitnessModifiers.legnth > 0) {
      for (let mod of this.fitnessModifiers) {
        total += mod.mod;
      }
    }

    return total;
  }

  consumeFood() {
    let eaten = Math.floor(this.getTotalFoodConsumptionRate());
    let currentFood = this.foodCount;
    this.foodCount = currentFood - eaten < 0 ? 0 : (this.foodCount -= eaten);
    return eaten;
  }

  tickAllModifiers() {
    this.decayFoodConsumptionModifiers();
  }

  decayFoodConsumptionModifiers() {
    for (let mod of this.foodConsumptionModifiers) {
      // console.log(mod)
      mod.time -= 1;
    }
    // console.log(this.foodConsumptionModifiers)
    let newMods = this.foodConsumptionModifiers.filter((item) => {
      //    console.log(item)
      return item.time > 0;
    });
    // console.log(newMods)
    this.foodConsumptionModifiers = newMods;
  }

  getTotalFoodConsumptionRate() {
    let baseRate = this.getBaseFoodConsumptionRate();
    // console.log(baseRate)
    let modRate = this.getModifiedFoodConsumptionRate();
    // console.log(modRate)
    return (baseRate + modRate) * this.farniansCount;
  }

  getBaseFoodConsumptionRate() {
    let fitnessScale = { min: -5, max: 5 };
    let consumptionScale = { max: 2, min: 0.66 };
    let fitnessArray = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
    let fitnessRange = fitnessScale.max - fitnessScale.min;
    let consumptionRange = consumptionScale.max - consumptionScale.min;
    let baseConsumptionRate =
      (consumptionRange / fitnessRange) *
        fitnessArray.indexOf(this.fitnessCount) +
      consumptionScale.min;

    // console.log(baseConsumptionRate)

    return baseConsumptionRate;
  }

  addFoodConsumptionModifier(newMod, time = 1) {
    this.foodConsumptionModifiers.push({ mod: newMod, time: time });
  }

  getModifiedFoodConsumptionRate(newMod, time = 1) {
    let totalMod = 0;
    if (this.foodConsumptionModifiers.length > 0) {
      for (let item of this.foodConsumptionModifiers) {
        totalMod += item.mod;
      }
      //   console.log(totalMod)
    }
    return totalMod;
  }

  updateCrewCount() {
    this.farniansCount = this.farniansCrew.length;
  }

  generateFarnian(name, age) {
    if (name === null || name === "" || name === undefined) {
      if (getRandom(2) === 1) {
        name = femaleNames[getRandom(femaleNames.length - 1)];
      } else {
        name = maleNames[getRandom(maleNames.length - 1)];
      }
    }
    if (age === null || age === undefined) {
      age = getRandom(35) + 20;
    }

    return new Farnian(name, age);
  }

  addCrew(name, age) {
    return new Promise((resolve, reject) => {
      // todo
      let crewMember = this.generateFarnian(name, age);
      //    console.log(this.crewKey);
      crewMember.key = this.crewKey;
      this.farniansCrew.push(crewMember);
      this.updateCrewCount();
      this.crewKey++;
      resolve("added");
      reject("not added");
    });
  }

  loseRandomCrew(reason) {
    if (this.farniansCrew.length === 0) {
      this.loseGame("farnians");
      return;
    }
    let index = getRandom(this.farniansCrew.length - 1);

    let lostCrew = this.farniansCrew[index];
    this.farniansCrew.splice(index, 1);
    this.updateCrewCount();
    this.message += `${lostCrew.name} ${
      deathCauses[reason][getRandom(deathCauses[reason].length - 1)]
    } .  `;
    return lostCrew;
  }

  loseSpecificCrew(name, key) {
    let newCrew = this.farniansCrew.filter(function (crew) {
      console.log(crew.key !== key);
      return crew.key !== key;
    });
    //   console.log(newCrew)
    this.farniansCrew = newCrew;
    this.fitnessCount = this.farniansCrew.length;
    return `Crew member ${name} is no longer with us`;
  }

  collectReward(chosen) {
    let rewards = this.choices[chosen].rewards;

    for (let i = 0; i < rewards.length; i++) {
      if (rewards[i].name === "food") this.foodCount += rewards[i].amount;
      if (rewards[i].name === "fitness") this.fitnessCount += rewards[i].amount;
      if (this.fitnessCount > 5) this.fitnessCount = 5;
      if (rewards[i].name === "fuel") this.fuelCount += rewards[i].amount;
    }
    console.log("rewards gathered");
  }

  expedition(chosen = 0) {
    let stats = {};
    let noFood = this.foodCount <= 0;
    let noFarnians = this.farniansCount <= 0;
    let noFitness = this.fitnessCount <= -5;

    stats.foodEaten = this.consumeFood();
    stats.fitnessChange = this.decayFitness(noFood);
    if (noFood && noFitness) stats.died = this.loseRandomCrew("food");
    this.tickAllModifiers();
    this.collectReward(chosen);
    this.choices = this.newSystems();
    let noFuel = this.fuelCount <= 0;
    if (noFarnians || noFuel) this.loseGame(noFarnians ? "Farnians" : "Fuel");
    return stats;
  }

  jump(chosen = 0, cost = 1) {
    let stats = {};
    let noFood = this.foodCount <= 0;
    let noFitness = this.fitnessCount <= -5;
    let noFuel = this.fuelCount <= 0;
    this.fuelCount -= cost;
    stats.foodChange = this.consumeFood();
    stats.fitnessChange = this.decayFitness(noFood);
    if (noFitness) {
      stats.died = this.loseRandomCrew("fitness");
    }
    let noFarnians = this.farniansCount <= 0;

    this.tickAllModifiers();
    if (noFarnians || noFuel) {
      this.loseGame(noFuel ? "Fuel" : "Farnians");
      return;
    }
    this.distanceLeft += this.choices[chosen].distance;
    console.log("Choices in game controller", this.choices);
    if (this.distanceLeft <= 0) {
      this.distanceLeft = 0;
      this.winGame();
      return;
    }
    this.choices = this.choices[chosen].encounters;
    let additional = getRandom(3);
    if (additional > 0)
      this.choices = this.choices.concat(this.newEncounters(additional));
    this.message = "";
    return stats;
  }

  newSystems() {
    let systems = generateSystem(4);

    for (let i = 0; i < 3; i++) {
      systems[i].encounters.push(generateSystemPreview(resources[i]));
    }
    systems[3].encounters.push(generateSystemPreview(getRandomResource()));

    this.choices = systems;

    return systems;
  }
  newEncounters(num = 4) {
    let encounters = [];
    for (let i = 0; i < num; i++) {
      encounters.push(generateEncounter());
    }
    return encounters;
  }

  loseGame(param) {
    this.lost = true;
    this.choices = [];
    this.message = `Game Over! You ran out of ${param}`;
  }

  winGame() {
    this.won = true;
    this.message = "You made it!  The Farnians will survive!";
    this.choices = [];
  }
}

// var game1 = new Game()
// console.log(game1)

// let testAddSpecific = game1.addCrew('', 5)
// console.log(testAddSpecific, game1)

// let testAddRandom = game1.addCrew()
// console.log(testAddRandom, game1)

// let testLoseSpecific = game1.loseSpecificCrew('F1')
// console.log(testLoseSpecific, game1)

// let testLost = game1.loseRandomCrew()
// console.log(testLost, game1)
// game1.addFoodConsumptionModifier(5, 2)
// console.log(game1)
// console.log(game1.foodConsumptionRate)
// game1.consumeFood()
// console.log(game1)
// game1.decayFoodConsumptionModifiers()
// console.log(game1)

// chooseRandomResource()
// getRandom()

export default Game;
