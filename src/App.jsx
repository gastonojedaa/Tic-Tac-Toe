import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import confetti from "canvas-confetti";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGame, resetGameStorage } from "./logic/storage/index.js";

export const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  // Actualizar tablero
  const updateBoard = (index) => {
    // no actualizar esta posicion si ya tiene algo o ya hay ganador
    if (board[index] || winner) return;
    // actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar partida
    saveGame({ board: newBoard, turn: newTurn });
    // chequear si hay ganador
    const newWinner = checkWinner(newBoard); // se pasa el newBoard porque la ejecucion es asincrona entonces no podemos fiarnos del estado board
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <button onClick={resetGame}>Empezar nuevamente</button>
        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </main>
    </>
  );
};

export default App;
