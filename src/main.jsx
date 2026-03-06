import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useEffect } from "react";
import "./index.css";

function MyButtn({ value, SquareClick }) {
  return (
    <button className="Square" onClick={SquareClick}>
      {value}
    </button>
  );
}

var initial = {
  Play: Array(9).fill("\u2060"),
  Change: true,
  OpenPop: false,
};

export default function App() {
  const [Play, setPlay] = useState(initial.Play);
  const [Change, setChange] = useState(initial.Change);
  const [OpenPop, setOpenPop] = useState(initial.OpenPop);

  function handleClick(i) {
    if ((Play[i] && Play[i] != "\u2060") || Calculator[i]) {
      console.log("No", Play[i]);
      return;
    }

    const NextSquare = Play.slice();

    if (Change) {
      NextSquare[i] = "X";
    } else {
      NextSquare[i] = "O";
    }

    setPlay(NextSquare);
    setChange(!Change);
  }

  const winner = Calculator(Play);

  useEffect(() => {
    if (winner) {
      setOpenPop(true);
    }
  }, [winner]);

  function reset() {
    setPlay(initial.Play);
    setChange(initial.Change);
    setOpenPop(initial.OpenPop);
  }
  return (
    <>
      <main>
        <h1>TicTacToe</h1>
        <div className="Row">
          <MyButtn value={Play[0]} SquareClick={() => handleClick(0)} />
          <MyButtn value={Play[1]} SquareClick={() => handleClick(1)} />
          <MyButtn value={Play[2]} SquareClick={() => handleClick(2)} />
        </div>
        <div className="Row">
          <MyButtn value={Play[3]} SquareClick={() => handleClick(3)} />
          <MyButtn value={Play[4]} SquareClick={() => handleClick(4)} />
          <MyButtn value={Play[5]} SquareClick={() => handleClick(5)} />
        </div>
        <div className="Row">
          <MyButtn value={Play[6]} SquareClick={() => handleClick(6)} />
          <MyButtn value={Play[7]} SquareClick={() => handleClick(7)} />
          <MyButtn value={Play[8]} SquareClick={() => handleClick(8)} />
        </div>
      </main>
      <PopUp
        open={OpenPop}
        close={() => {
          reset();
        }}
      >
        <h2>{winner} Wins!</h2>
      </PopUp>
    </>
  );
}

function PopUp({ open, close, children }) {
  if (!open) {
    return null;
  }
  return (
    <div className="PopUpOuter">
      <div className="PopUpInner">
        {children}
        <button className="RestartBtn" onClick={close}>
          Restart
        </button>
      </div>
    </div>
  );
}

function Calculator(Play) {
  const Winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < Winners.length; i++) {
    const [a, b, c] = Winners[i];
    if (
      Play[a] &&
      Play[a] === Play[b] &&
      Play[a] === Play[c] &&
      Play[a] != "\u2060"
    ) {
      return Play[a];
    }
  }

  return null;
}

createRoot(document.getElementById("root")).render(<App />);
