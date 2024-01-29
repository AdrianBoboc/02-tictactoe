import './App.css'
import './index.css'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkWinnerForm, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { TurnModal } from './components/TurnModal'
import { SaveGameToStorage, ResetGameStorage } from './logic/storage'

function App() {

  //Se ejecuta cada vez que se actualiza el estado de la aplicacion
  //Sirve para guardar el estado del tablero en el local state
  //Si hay algo guardado en el local storage, lo carga en el local state
  //Sino, crea un array de 9 posiciones vacias
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  //Se ejecuta cada vez que se actualiza el estado de la aplicacion
  //Sirve para guardar el turno en el local state
  //Si hay algo guardado en el local storage, lo carga en el local state
  //Sino, inicia con el turno por defecto (X)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //Se ejecuta cada vez que se actualiza el estado de la aplicacion
  //Sirve para actualizar el estado del ganador
  //Este empieza siendo null, cuando se actualiza el tablero se comprueba si hay ganador
  const [winner, setWinner] = useState(null)

  //Se ejecuta cada vez que se le ca click a un cuadrado, un Square del Board
  const updateBoard = (index) => {
    //Si el cuadrado ya tiene algo, no hace nada
    //Si hay un ganador, no hace nada
    if (board[index] || winner) return

    //Creo un nuevo array del tablero, que sea igual que el ya establecido
    const newBoard = [...board]
    //Establezco el valor del cuadrado en el turno actual (X o O)
    newBoard[index] = turn
    //Actualizo el tablero con el nuevo array
    setBoard(newBoard)
    //Establezco el turno siguiente, si es X pasa a ser O, si es O pasa a ser X
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    //Actualizo el turno con el nuevo turno (X o O)
    setTurn(newTurn)
    //Compruebo si hay ganador con el nuevo tablero y el nuevo turno (X o O)
    const newWinner = checkWinnerForm(newBoard)

    //Guardo el tablero y el turno en el local storage, para que se mantenga al cargar la pagina
    SaveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //Si hay ganador, se muestra el modal de ganador, si no, se muestra el modal de empate
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  //Resetea el juego, borra el tablero, el turno y el ganador, y el local storage
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    ResetGameStorage()
  }

  //Aquí es donde se pinta todo
  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        {/* Boton para resetear el juego */}
        <button onClick={resetGame}>Reset del juego</button>
        
        {/* Se muestra el tablero con los cuadrados,
        cada cuadrado se llama Square,
        y se le pasa el valor del cuadrado y
        la funcion updateBoard para actualizar el tablero
        cuando se le da click a un cuadrado */}
        <Board board={board} updateBoard={updateBoard} />

        {/* Este es el modal que enseña los turnos y le paso el turno en el que está y los turnos disponibles como hooks */}
        <TurnModal turn={turn} TURNS={TURNS} />

        {/* Este es el modal que sale cuando hay un ganador y le paso el hook de reset game y del winner */}
        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
