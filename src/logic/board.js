import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
    // Chequear si 3 posiciones de las combinaciones de arriba coinciden y devuelve el ganador
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

   //checkear si hubo un empate
export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)    
  };