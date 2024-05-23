import { useState } from 'react'
import Box from './Components/Box'
import Features from './Components/Features'

function App() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(id) {
    if(squares[id] === 'X' || squares[id] === 'O' || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if(xIsNext) nextSquares[id] = 'X';
    else nextSquares[id] = 'O';
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  function handleRestart() {
    const nextSquares = Array(9).fill(null);
    setXIsNext(true);
    setSquares(nextSquares);
  }

  function calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [0,3,6],
      [0,4,8],
      [1,4,7],
      [2,4,6],
      [2,5,8],
      [3,4,5],
      [6,7,8]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className='h-screen max-w-full bg-black'>
      <h1 className='text-white font-mono text-7xl font-bold text-center pt-7'>Tic Tac Toe</h1>
      <h2 className='text-white font-mono text-3xl font-bold text-center pt-7 mt-4 ' >{status}</h2>
      <div className='flex justify-center'>
        <div className='flex justify-center items-center mt-10  flex-wrap w-96'>
          {squares.map((square,index) => <Box key={index} value={square} id={index} onBoxClick={handleClick}/>)}
        </div>
      </div>
      <Features restart={handleRestart} />
    </div>
  )
}

export default App
