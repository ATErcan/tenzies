import { useState } from "react";
import Die from "./Die";
import "./Main.css";

const Main = () => {
  const [dice, setDice] = useState(() => allNewDice());
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }
  const dieComponents = dice.map((die, i) => {
    return <Die key={i} value={die} />;
  });

  const rollDice = () => {
    setDice(allNewDice());
  };

  return (
    <main>
      <div className="tenzies-container">
        <div className="tenzies">
          <div className="dice-container">{dieComponents}</div>
          <button className="roll" onClick={rollDice}>
            Roll
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;
