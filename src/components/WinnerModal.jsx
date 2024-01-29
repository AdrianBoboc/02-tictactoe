import { Square } from "./Square"

//Basicamente lo que hace es que si hay un ganador, muestra el nombre del ganador, si no hay ninguno, muestra un empate y me traigo los parametros del useState como hooks
export function WinnerModal({winner, resetGame}) {

  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : "Ganó: "

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}