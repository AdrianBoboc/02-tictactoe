// Componente Square
export const Square = ({ children, isSelected, updateBoard, index }) => {
  
  // Si isSelected es true, agrega la clase is-selected al div, de lo contrario no agrega ninguna clase.
  const className = `square ${isSelected ? 'is-selected' : ''}`

  // Si el div es clickeado, llama a la función updateBoard con el índice del div como argumento.
  const handleClick = () => {
    updateBoard(index)
  }

  // Renderiza el div con la clase square y la clase is-selected si isSelected es true.
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}