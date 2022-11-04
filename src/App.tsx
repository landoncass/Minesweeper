import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    board: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, 56, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, 'sadfa', null, null, null, null, null, null],
      [null, null, null, null, null, 1543, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ],
    id: null,
    winner: null,
  })

  function handleClickCell(row: number, column: number) {
    console.log(`You clicked on row ${row} and column ${column}`)
  }

  async function handleNewGame() {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )

    if (response.ok) {
      const newGameState = await response.json()

      setGame(newGameState)
    }
  }

  return (
    <div>
      <div className="game">
        <h1>Minesweeper</h1>
        <p>
          <button onClick={handleNewGame}>New Game</button>
        </p>
        <p>
          <table>
            <tbody>
              {game.board.map((row) => (
                <tr>
                  {row.map((col) => (
                    <td>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </p>
      </div>
    </div>
  )
}
