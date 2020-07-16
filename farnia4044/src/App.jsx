import React, { Component } from "react";
import HUD from "./components/Hud";
// import JumpButton from "./components/JumpButton.jsx";
import Game from "./gameLogic/F";

import Choices from "./components/Choices.jsx";
import IdleStarField from "./components/IdleStarField.jsx";
import JumpStarField from "./components/JumpStarfield";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crewCount: 0,
      crew: [],
      distanceLeft: 0,
      lost: false,
      food: 0,
      fitness: 0,
      fuel: 0,
      jumping: false,
      message:
        "The Farnian solar system is collapsing. In a race for survival, the Farnians have developed an engine capable of faster-than-light travel. They have chosen a system suitable for habitation, and built a ship to get there.  The fate of their entire species is in the hands of a small crew, on a small ship, carrying a small batch of Farnian embryos.  Can you get them to their destination?",
      choices: [
        { name: "Easy" },
        { name: "Normal" },
        { name: "Hard" },
        { name: "Hopeless" },
      ],
      selection: null,
      scene: 0,
      scenes: {
        0: { prompt: " Farnia : 4044", name: "New Game?", scene: 0 },
        1: {
          prompt: "Choose a Destination Solar System",
          name: "System",
          scene: 1,
        },
        2: {
          prompt: "Choose an Intra-System Expedition",
          name: "Expedition",
          scene: 2,
        },
        3: { prompt: "Success", name: "Destination", scene: 3 },
      },
      resourceSymbols: {
        fuel: "Φ",
        food: "∰",
        fitness: "⨸",
        farnians: "Ö",
        farsecs: "⤞",
      },
      resourceColors: {
        fuel: "blue",
        food: "green",
        fitness: "purple",
        farnians: "orange",
        farsecs: "grey",
      },
      updates: {},
    };
    this.game = new Game();
    this.selectChoice = this.selectChoice.bind(this);
    this.jump = this.jump.bind(this);
    this.endJump = this.endJump.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.noGo = this.noGo.bind(this);
    this.chooseDifficulty = this.chooseDifficulty.bind(this);
  }

  componentDidMount() {
    //   console.log(this.game)
  }
  chooseDifficulty(event) {
    const choice = event.target.value;
    console.log("Difficulty chosen = ", choice);

    this.game.initialize(choice);
    this.game.newSystems();
    this.jump(0);
  }
  selectChoice(event) {
    event.preventDefault();
    // console.log('selcetion button value', event.target.value)
    // document.getElementsByClassName("App", () => {});
    const choice = event.target.value;
    const scn = this.state.scene;
    switch (scn) {
      case 1:
        this.game.jump(choice);
        this.jump(scn);
        break;
      case 2:
        this.game.expedition(choice);
        this.expedition(scn);
        break;
      default:
        this.noGo();
    }
  }

  updateState(jump = false, scene, lost = false, won = false, callback) {
    let choices =
      lost || won
        ? [
            { name: "Easy" },
            { name: "Normal" },
            { name: "Hard" },
            { name: "Hopeless" },
          ]
        : this.game.choices;
    const cb = callback ? callback : null;
    this.setState(
      {
        crew: this.game.farniansCrew,
        crewCount: this.game.farniansCount,
        fuel: this.game.fuelCount,
        food: this.game.foodCount,
        fitness: this.game.fitnessCount,
        distanceLeft: this.game.distanceLeft,
        choices: choices,
        message: this.game.message,
        jumping: jump,
        scene: scene,
        lost: this.game.lost,
        won: won,
      },
      cb
    );
  }

  // handleClick(event) {
  //   let scn = this.state.scene;
  //   // let updates;
  //   let chosen = this.state.selection === null ? 0 : this.state.selection;
  //   switch (scn) {
  //     // case 0:
  //     //   this.game.initialize(chosen);
  //     //   this.game.newSystems();
  //     //   this.jump(scn);
  //     //   break;
  //     case 1:
  //       this.game.jump(chosen);
  //       this.jump(scn);
  //       break;
  //     case 2:
  //       this.game.expedition(chosen);
  //       this.expedition(scn);
  //       break;
  //     default:
  //       this.noGo();
  //   }
  // console.log(this.game)
  // }

  jump(scn) {
    //   event.preventDefault()
    // const stars = document.querySelectorAll("div.backgroundStar");
    // stars.forEach((star, i) => {
    //   let delay = `${Math.random() * 900}ms`;
    //   star.style.animationDelay = delay;
    //   star.style.animationName = "hyper";
    // });

    this.updateState(true, scn, false, false, () => {
      this.endJump(scn + 1);
    });
  }

  noGo() {
    window.location.reload(false);
  }

  endJump(scene, timeout = 1750) {
    let lost = this.state.lost;
    let won = this.state.won;
    let scn = lost ? 0 : scene;
    setTimeout(() => {
      // const stars = document.querySelectorAll("div.backgroundStar");
      // stars.forEach((star, i) => {
      //   star.style.animationName = null;
      // });

      this.updateState(false, scn, lost, won);
    }, timeout);
  }

  expedition(scene) {
    const stars = document.querySelectorAll("div.backgroundStar");
    // stars.forEach((star, i) => {
    //   let delay = `${Math.random() * 900}ms`;
    //   star.style.animationDelay = delay;
    //   star.style.animationName = "hyper";
    // });

    this.updateState(true, scene, false, false, () => {
      this.endJump(scene - 1);
    });
  }

  render() {
    const scn = this.state.scenes[this.state.scene];
    const jumping = this.state.jumping;
    // let lost = this.state.lost;
    // let won = this.state.won;
    return (
      <div className="App container-fluid" style={{ background: "black" }}>
        {jumping ? <JumpStarField /> : <IdleStarField />}

        <HUD
          fuel={this.state.fuel}
          food={this.state.food}
          fitness={this.state.fitness}
          crewCount={this.state.crewCount}
          distanceLeft={this.state.distanceLeft}
          symbols={this.state.resourceSymbols}
          colors={this.state.resourceColors}
        />
        <Choices
          choices={this.state.choices}
          prompt={
            this.game.won
              ? this.state.scenes[3].prompt
              : this.game.lost
              ? "FAIL!"
              : scn.prompt
          }
          chooseDifficulty={this.chooseDifficulty}
          onSelect={this.selectChoice}
          jumping={jumping}
          // clickJump={
          //   jumping
          //     ? ""
          //     : this.game.lost || this.game.won
          //     ? this.noGo
          //     : this.handleClick
          // }
          scene={this.state.scene}
          symbols={this.state.resourceSymbols}
          colors={this.state.resourceColors}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default App;
