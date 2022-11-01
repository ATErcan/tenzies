import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./Main.css";

const Main = () => {
  const [dice, setDice] = useState(() => allNewDice());
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const holdDice = (id) => {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  };

  const dieComponents = dice.map((die) => {
    return <Die key={die.id} value={die.value} die={die} holdDice={holdDice} />;
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
