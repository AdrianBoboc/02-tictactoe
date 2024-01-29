import { Square } from "./Square"

// Componente modal de los turnos al que me traigo
export function TurnModal({turn, TURNS}) {
  // Si el turno es igual a X, entonces se muestra el modal con el turno X
  // Si el turno es igual a O, entonces se muestra el modal con el turno O
  return(
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
  )
}