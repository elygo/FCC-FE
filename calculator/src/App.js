import React, { useState } from 'react';
import './App.css';

function App() {
  // if true shows result else current value
  const [showresult, setShowresult] = useState(false);
  const [result, setResult] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [current, setCurrent] = useState(0);
  const [operator, setOperator] = useState('');
  // if true if one of the operators button is clicked
  const [active, setActive] = useState(false);
   
  const number = (n) => {
    if ((Number(current) === 0 && !current.toString().includes('.')) || (Number(n) === 0 && Number(current) === 0 && !current.toString().includes('.'))) {
      setCurrent(n)
    } else {
      setCurrent(current + n)
    }
    setActive(0);
  } 
  
  const dot = () => {
    if (!current.toString().includes('.')) {
      setCurrent(current + '.');
      setShowresult(false);
    }
    setActive(0);
  }

  const operate = (sign) => {
    setCurrent(0);
    if (previous === null) {
      setPrevious(current);
      setShowresult(true);
      setResult(current);
    } else {
      calculate(previous, current, operator, sign);
    }

    if (active && sign === '-') {
      setOperator(operator);
    } else {
      setOperator(sign);
    }
    setActive(active + 1);
  }

  const calculate = (previous, current, prevOperator, currOperator) => {
    let prev = parseFloat(previous);
    let curr = parseFloat(current);
    let res;
    setShowresult(true);
    if (active === 1 && currOperator === '-') {
      setPrevious(previous * (-1));
    } else if (active > 1) {
      setOperator(currOperator);
      setPrevious(previous * (-1));
    } else if (active > 1) {      
      setOperator(currOperator);
    } else {
      switch (prevOperator) {
        case '+':
          res = prev + curr;
          setPrevious(res);
          setResult(res);
          break;
        case '-':
            res = prev - curr;
            setPrevious(res);
            setResult(res);
          break;
        case '*':
          res = prev * curr;
          setPrevious(res);
          setResult(res);
          break;
        case '/':
          if ( curr === 0 ) { res = 'Non-divisible' } else { res = prev / curr; };
          setPrevious(res);
          setResult(res);
          break;
        default:
      }
    }    
  }

  const clear = () => {
    setResult(null);
    setPrevious(null);
    setCurrent(0);
    setOperator('');
    setShowresult(false);
    setActive(0);
  }

  const ac = () => {
    setResult(null);
    setPrevious(null);
    setCurrent(0);
    setOperator(null);
    setShowresult(false);
    setActive(0);
  }

  const equals = () => {
    if (operator === '' || previous === null) {

    } else {
      calculate(previous, current, operator);
      setOperator('');
      setActive(0);
    }
  }

  const buttons = [
    { id: 1, text: "clear", sign: "C", click: clear },
    { id: 2, text: "allclear", sign: "AC", click: ac },    
    { id: 3, text: "negate", sign: "+/-", click: () => { setCurrent(current * (-1))} },
    { id: 4, text: "divide", sign: "/", click: () => { operate("/")} },
    { id: 5, text: "one", sign: "1", click: () => { setShowresult(false);  number('1'); } },
    { id: 6, text: "two", sign: "2", click: () => { setShowresult(false); number('2') } },
    { id: 7, text: "three", sign: "3", click: () => { setShowresult(false); number('3') } },    
    { id: 8, text: "add", sign: "+", click: () => { operate("+")} },
    { id: 9, text: "four", sign: "4", click: () => { setShowresult(false); number('4') } },
    { id: 10, text: "five", sign: "5", click: () => { setShowresult(false); number('5') } },
    { id: 11, text: "six", sign: "6", click: () => { setShowresult(false); number('6') } },
    { id: 12, text: "subtract", sign: "-", click: () => { operate("-")} },
    { id: 13, text: "seven", sign: "7", click: () => { setShowresult(false); number('7') } },
    { id: 14, text: "eight", sign: "8", click: () => { setShowresult(false); number('8') } },
    { id: 15, text: "nine", sign: "9", click: () => { setShowresult(false); number('9') } },
    { id: 16, text: "multiply", sign: "*", click: () => { operate("*")}  },
    { id: 17, text: "decimal", sign: ".", click: dot },
    { id: 18, text: "zero", sign: "0", click: () => { setShowresult(false); number('0') } },
    { id: 19, text: "equals", sign: "=", click: equals },
  ];

  return (
    <div className="wrapper">
      <div className="container">
        <div className="previous">
          {previous} {operator}
        </div>
        <div className="current" id="display">
          {showresult ? result : current}
        </div>
        <div className="buttons">
      { 
        buttons.map((button) => {
          return(
            <div className="button" key={button.id} onClick={ button.click } id={button.text}>
              { button.sign }
            </div>
          );
        }) 
      }
      </div>
      </div>
      <span className="author">by Elyor Farmonov</span>
    </div>
  );
}

export default App;
