//A lo largo de la partida, cada vez que se actualiza el tablero, se va guardando el estado de dicho tablero y de quien es el turno
export const SaveGameToStorage = ({board, turn}) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

//Resetea todo el local storage que se ha guardado a lo largo de la partida
export const ResetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
  window.localStorage.removeItem('winner')
}