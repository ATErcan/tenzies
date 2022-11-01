import { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./Main.css";
import Confetti from "react-confetti";

const Main = () => {
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const isEqual = dice.every((die) => die.value === firstValue);
    if (allHeld && isEqual) {
      setTenzies(true);
    }
  }, [dice]);

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

  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const rollDice = () => {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld ? die : generateNewDice();
      });
    });
  };

  const newGame = () => {
    setTenzies(false);
    return setDice(allNewDice());
  };

  return (
    <main>
      <div className="tenzies-container">
        <div className="tenzies">
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{dieComponents}</div>
          {tenzies && <p className="win-message">You Won!</p>}
          <button className="roll" onClick={tenzies ? newGame : rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;
