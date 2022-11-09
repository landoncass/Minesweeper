import React, { useState } from 'react'
import axios from 'axios'

export function App() {
  const [game, setGame] = useState({
    id: null,
    board: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ],
    state: null,
    mines: null,
  })

  async function handleLeftClick(row: number, col: number) {
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`

    const body = { row, col }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    setGame(await response.json())
  }

  async function handleRightClick(row: number, col: number) {
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`

    const body = { row, col }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    setGame(await response.json())
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

  let header = 'Minesweeper'

  if (game.state === 'won') {
    header = 'You won!'
  } else if (game.state === 'lost') {
    header = 'You lost! Play again?'
  } else if (game.state === 'playing') {
    header = 'You are playing Minesweeper'
  } else if (game.state === 'new') {
    header = 'Make your first move'
  }
  return (
    <div>
      <div className="game">
        <h1>{header}</h1>
        <p>
          <button onClick={handleNewGame}>Press to start new game</button>
        </p>
        <table>
          <tbody>
            {game.board.map((row, y) => (
              <tr>
                {row.map((col, x) => (
                  <td
                    onClick={() => handleLeftClick(y, x)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      handleRightClick(y, x)
                    }}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
