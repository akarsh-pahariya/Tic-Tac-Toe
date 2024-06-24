import { useEffect, useState } from 'react'
import Box from './Components/Box'
import Features from './Components/Features'

function App() {

  const element = [];
  for (let i = 0; i < 9; i++) {
    const row = [];  
    for (let i = 0; i < 9; i++) {
      row.push(null);
    } 
    element.push(row);
  }

  const element2 = [];
  for (let i = 0; i < 9; i++) {
    element2.push(null);
  }

  const [history, setHistory] = useState(element);
  const [xIsNext, setXIsNext] = useState(true);
  const [status,setStatus] = useState('');
  let [current, setCurrent] = useState(-1);
  const [squares, setSquares] = useState(element2);

  function handleClick(id) {
    const nexthistory = [];
    for (let i = 0; i < 9; i++) {
      const row = [];  
      for (let i = 0; i < 9; i++) {
        row.push(null);
      } 
    nexthistory.push(row);
    }
    if(current === -1) {
      nexthistory[0][id] = 'X';
    } else { 
      if(history.at(current)[id] === 'X' || history.at(current)[id] === 'O' || calculateWinner(history)) return;
      for (let i = 0; i <= current; i++) {
        for (let j = 0; j < history.at(i).length; j++) {
          nexthistory.at(i)[j] = history.at(i)[j];
        }
      }
      for (let i = 0; i < nexthistory[current+1].length; i++) {
        nexthistory[current+1][i] = nexthistory[current][i];
      }       
      if(xIsNext) nexthistory.at(current+1)[id] = 'X';
      else nexthistory.at(current+1)[id] = 'O';
    } 
    setCurrent((prev) => prev+1); 
    setXIsNext(!xIsNext);
    setHistory(nexthistory);
  }

  function handleRestart() {
    const nexthistory = [];
    for (let i = 0; i < 9; i++) {
      const row = [];  
      for (let i = 0; i < 9; i++) {
        row.push(null);
      } 
      nexthistory.push(row);
    }
    const nextSquares = [];
    for (let i = 0; i < 9; i++) {
      nextSquares.push(null);
    }
    setXIsNext(true);
    setStatus("X's Turn");
    setHistory(nexthistory);
    setSquares(nextSquares);
    setCurrent(-1);
  }

  function calculateWinner(history) {
    const lines = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (history.at(current)[a] && history.at(current)[a] === history.at(current)[b] && history.at(current)[a] === history.at(current)[c]) {
        return history.at(current-1)[a];
      }
    }
    return null;
  }

  function handlePrev() {
    if(current > 0) {
      setCurrent((prev) => prev-1);
      setSquares(history[current]);
      setXIsNext(!xIsNext);
    } else if (current === 0) {
      const element2 = [];
      for (let i = 0; i < 9; i++) {
        element2.push(null);
      }
      setSquares(element2);
      setCurrent((prev) => prev-1);
      setXIsNext(!xIsNext);
    } else {
      window.alert("No more previous moves");
    }
  }

  function handleNext() {
    if(current < 8) {
      const next = [];
      for (let i = 0; i < 9; i++) {
        next.push(history[current+1][i]);
      }
      let flag = false;
      console.log(next);
      for (let i = 0; i < 9; i++) {
        if(next[i] !== null) {
          flag = true;
          setSquares(history[current+1]);
          setCurrent(prev => prev+1);
          setXIsNext(!xIsNext);
          break;
        }
      }
      if(flag === false) {
        window.alert("No next moves");
      }
    } else {
      window.alert("No next moves");
    }
  }

  useEffect(() => {
    if(current === -1) setStatus("X's Turn");
    else{
      const res = calculateWinner(history);
      if(xIsNext === true && res === null) {setStatus("X's Turn");}
      else if (xIsNext === false && res === null) {setStatus("O's Turn");}
      let flag = true;
      for (let i = 0; i < history.at(current).length; i++) {
        const element = history.at(current)[i];
        if(!element) {
          flag = false;
          break;
        }
      }
      if(flag) setStatus('Match Draw');
      if(res !== null) {setStatus(`${res} is winner`)}
      setSquares(history[current]);
    }
  },[xIsNext,current]);

  return (
    <div className='h-screen max-w-full bg-black'>
      <h1 className='text-white font-mono text-7xl font-bold text-center pt-7'>Tic Tac Toe</h1>
      <h2 className='text-white font-mono text-3xl font-bold text-center pt-7 mt-4 '>{status}</h2>
      <div className='flex justify-center'>
        <div className='flex justify-center items-center mt-10  flex-wrap w-96'>
          {squares.map((square,index) => <Box key={index} value={square} id={index} onBoxClick={handleClick}/>)}
        </div>
      </div>
      <div className='flex flex-row justify-center'>
        <Features prev={handlePrev} text="Prev ⬅️" id="1"/>
        <Features restart={handleRestart} text="Restart 🔄️" id="2"/>
        <Features next={handleNext} text="Next ➡️" id="3"/>
      </div>
    </div>
  )
}

export default App
