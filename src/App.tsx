import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    //
    ;(async () => {
      const gameID = localStorage.getItem('gameID')
      console.log({ gameID })
      if (gameID) {
        const response = await fetch(
          `https://minesweeper-api.herokuapp.com/games/${gameID}`
        )
        setGame(await response.json())
      }
    })()
  }, [])

  useEffect(() => {
    if (game.id) {
      localStorage.setItem('gameID', game.id)
    }
  }, [game.id])

  async function handleLeftClick(row: number, col: number) {
    if (
      game.id === null ||
      game.state === 'won' ||
      game.state === 'lost' ||
      game.board[row][col] !== ' '
    ) {
      return
    }
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
    if (
      game.id === null ||
      game.state === 'won' ||
      game.state === 'lost' ||
      game.board[row][col] !== ' '
    ) {
      return
    }
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`

    const body = { row, col }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    setGame(await response.json())
  }

  async function handleNewGame(difficulty: number) {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games?difficulty=${difficulty}`,
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
  let header2 = "Choose the level of difficulty you'd like to play"

  if (game.state === 'won') {
    header = 'You won! Play again?'
    header2 = "Choose the level of difficulty you'd like to play"
  } else if (game.state === 'lost') {
    header = 'You lost! Play again?'
    header2 = "Choose the level of difficulty you'd like to play"
  } else if (game.state === 'playing') {
    header = 'You are playing Minesweeper'
    header2 = `Game #${game.id} has ${game.mines} mines`
  } else if (game.state === 'new') {
    header = 'Make your first move'
    header2 = `Game #${game.id} has ${game.mines} mines`
  }

  return (
    <div className="gamePlay">
      <div className="header">
        <h1>{header}</h1>
        <h4>{header2}</h4>
        <p>
          <button onClick={() => handleNewGame(0)}>Easy</button>
          <button onClick={() => handleNewGame(1)}>Medium</button>
          <button onClick={() => handleNewGame(2)}>Hard</button>
        </p>
      </div>
      <div className="game">
        <table>
          <tbody>
            {game.board.map((row, y) => (
              <tr key={y}>
                {row.map((col, x) => (
                  <td
                    key={x}
                    // className={
                    //   game.board[row][col] === ' ' ? undefined : 'taken'
                    // }

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
