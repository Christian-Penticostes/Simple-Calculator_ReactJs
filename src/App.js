import React, { useState, useRef } from 'react'
import { Parser } from 'expr-eval'
import './App.css'

function App() {
  const [output, setOutput] = useState('')
  const outputRef = useRef(null)

  const displayKey = (input) => {
    const lastChar = output.slice(-1)

    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(input)) {
      setOutput(prev => prev.slice(0, -1) + input)
    } else {
      setOutput(prev => {
        const newValue = prev + input
        // Scroll to end after update
        setTimeout(() => {
          if (outputRef.current) {
            outputRef.current.scrollLeft = outputRef.current.scrollWidth
          }
        }, 0)
        return newValue
      })
    }
  }

  const compute = () => {
    try {
      const result = new Parser().evaluate(output)
      if (!isFinite(result)) throw new Error("can't divide to 0")
      setOutput(result.toString())
    } catch {
      setOutput('Syntax ERROR')
    }
  }
  
  const reset = () => {
    setOutput('')
  }

  const del = () => {
    setOutput(prev => prev.slice(0, -1))
  }

  return (
    <div className="container">
      <div className="calculator">
        <input
          type="text"
          className="output"
          readOnly
          value={output}
          ref={outputRef}
        />
        <div className="keys">
          <button onClick={() => displayKey('+')}>+</button>
          <button onClick={() => displayKey('7')}>7</button>
          <button onClick={() => displayKey('8')}>8</button>
          <button onClick={() => displayKey('9')}>9</button>
          <button onClick={() => displayKey('-')}>-</button>
          <button onClick={() => displayKey('4')}>4</button>
          <button onClick={() => displayKey('5')}>5</button>
          <button onClick={() => displayKey('6')}>6</button>
          <button onClick={() => displayKey('*')}>*</button>
          <button onClick={() => displayKey('1')}>1</button>
          <button onClick={() => displayKey('2')}>2</button>
          <button onClick={() => displayKey('3')}>3</button>
          <button onClick={() => displayKey('/')}>/</button>
          <button onClick={() => displayKey('0')}>0</button>
          <button onClick={() => displayKey('.')}>.</button>
          <button onClick={compute}>=</button>
          <button onClick={reset}>C</button>
          <button onClick={del}>Del</button>
        </div>
      </div>
    </div>
  )
}

export default App
