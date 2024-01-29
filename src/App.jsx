import { useState } from 'react'
import './App.css'
import './index.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerForm, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { AlertFinish } from './components/AlertFinish'
import { SaveGameToStorage, ResetGameStorage } from './logic/storage'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinnerForm(newBoard)

    SaveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    if (newWinner) {
      confetti()
      setWinner(newWinner)
      //CUIDADO, ESTO NO SE PUEDE HACER PORQUE NO SE MOSTRARIA EL GANADOR EN EL TABLERO
      //alert("El ganador es " + newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    ResetGameStorage()
  }



  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        
        <Board board={board} updateBoard={updateBoard} />

        <AlertFinish turn={turn} TURNS={TURNS} />

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
