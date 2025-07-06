import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const getButtonDescription = (move) =>
    move > 0 ? `Go to move #${move}` : "Go to game start";

  const moves = history.map((squares, move) => (
    <li key={move}>
      <button
        className="travel-in-time-button"
        onClick={() => setCurrentMove(move)}
      >
        {getButtonDescription(move)}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="current-move">
          {currentMove === 0
            ? "You are at the start move"
            : `You are at move #${currentMove}`}
        </div>
      </div>

      <div className="game-info">
        <ol className="travel-in-time-button-list">{moves}</ol>
      </div>
    </div>
  );
}
