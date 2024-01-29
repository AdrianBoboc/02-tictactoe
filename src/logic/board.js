import { WINNER_COMBOS } from "../constants"

//Cada vez que se hace un movimiento y se actualiza el tablero, se llama a esta funcion para verificar si hay un ganador
export const checkWinnerForm = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}


//Cada vez que se hace un movimiento y se actualiza el tablero, se llama a esta funcion para verificar si hay ganador o es empate
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}