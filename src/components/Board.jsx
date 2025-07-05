import { calculateWinner } from "../helpers/GameHelper";
import { NUMBER_OF_COLS, NUMBER_OF_ROWS } from "../helpers/Constants";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const fullBoardTemplate = () =>
    Array.from({ length: NUMBER_OF_ROWS }).map((_val1, rowIndex) => (
      <div className="board-row" key={rowIndex}>
        {squaresRowTemplate(rowIndex)}
      </div>
    ));

  const squaresRowTemplate = (rowIndex) =>
    Array.from({ length: NUMBER_OF_COLS }).map((_val, colIndex) => (
      <Square
        value={squares[rowIndex * NUMBER_OF_ROWS + colIndex]}
        key={colIndex}
        onSquareClick={() => handleClick(rowIndex * NUMBER_OF_ROWS + colIndex)}
      />
    ));

  return (
    <>
      <h1 className="status">{status}</h1>
      {fullBoardTemplate()}
    </>
  );
}
