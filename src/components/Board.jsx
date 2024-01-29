import { Square } from "./Square"

//Basicamente renderizo el tablero y el componente Square tantas veces como sea necesario y traigo los parametros del useState como hooks
export function Board({board, updateBoard}) {
  return (
    <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {square}
                </Square>
              )
            })
          }
        </section>
  )
}