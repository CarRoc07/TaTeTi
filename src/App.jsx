/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import confetti from 'canvas-confetti'
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner } from "./utils"
import { SectionWinner } from "./components/SectionWinner"

function App() {
  const [board, setBoard] = useState( JSON.parse(window.localStorage.getItem('board')) || Array(9).fill(null) )
  const [turn, setTurn] = useState(JSON.parse(window.localStorage.getItem('turn')) || TURNS.X)
  const [winner, setWinner] = useState(JSON.parse(null))

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.clear()
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
      window.localStorage.clear()
    } else if (newBoard.every(square => square !== null)) {
      setWinner(false)
    }
  }



  return (
    <main className='board'>
      <h1>Ta te ti</h1>
      <button onClick={resetGame}> RESET </button>
      <section className='game'>
        {
          board.map((square, index) => { 
            return (
            <Square key={index} index={index} updateBoard={updateBoard}>{ square}</Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null  && (
          <SectionWinner winner={winner} resetGame={resetGame}/>
        )
      }
    </main>
  )
}

export default App
