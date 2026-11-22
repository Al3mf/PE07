import { useState } from 'react'
import { calculate, squareRoot } from './util/mathEngine'
import { formatResult } from './util/displayMath'

function App() {
  // State: the short term memory of the calculator
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [activeOperator, setActiveOperator] = useState(null);
  const [isResettingDisplay, setIsResettingDisplay] = useState(false);

  // Resets every state value to its default
  const handleClear = () => {
    setDisplay('0');
    setStoredValue(null);
    setActiveOperator(null);
    setIsResettingDisplay(false);
  };

  // Adds a digit to the display or starts a new number
  const handleNumber = (num) => {
    if (display === '0' || isResettingDisplay) {
      setDisplay(num);
      setIsResettingDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  // Saves the first number and the operator, or calculates a subtotal
  const handleOperator = (op) => {
    if (activeOperator && !isResettingDisplay) {
      const subtotal = formatResult(calculate(storedValue, display, activeOperator));
      setDisplay(subtotal);
      setStoredValue(subtotal);
    } else {
      setStoredValue(display);
    }
    setActiveOperator(op);
    setIsResettingDisplay(true);
  };

  // Calculates the final result
  const handleEqual = () => {
    if (!activeOperator || isResettingDisplay) return;

    const result = formatResult(calculate(storedValue, display, activeOperator));
    setDisplay(result);
    setStoredValue(null);
    setActiveOperator(null);
    setIsResettingDisplay(true);
  };

  // PE07: calculates the square root of the number on the display
  const handleSquareRoot = () => {
    const result = formatResult(squareRoot(parseFloat(display)));
    setDisplay(result);
    // With no pending operation, the next digit starts a new number.
    // With a pending operation, the result stays as the second number so = still works.
    setIsResettingDisplay(!activeOperator);
  };

  // Button layout array for mapping
  const buttons = [
    { label: 'C', action: handleClear, type: 'clear' },
    { label: '√', action: handleSquareRoot, type: 'operator' },
    { label: 'xʸ', action: () => handleOperator('^'), type: 'operator' },
    { label: '/', action: () => handleOperator('/'), type: 'operator' },
    { label: '7', action: () => handleNumber('7') },
    { label: '8', action: () => handleNumber('8') },
    { label: '9', action: () => handleNumber('9') },
    { label: '*', action: () => handleOperator('*'), type: 'operator' },
    { label: '4', action: () => handleNumber('4') },
    { label: '5', action: () => handleNumber('5') },
    { label: '6', action: () => handleNumber('6') },
    { label: '-', action: () => handleOperator('-'), type: 'operator' },
    { label: '1', action: () => handleNumber('1') },
    { label: '2', action: () => handleNumber('2') },
    { label: '3', action: () => handleNumber('3') },
    { label: '+', action: () => handleOperator('+'), type: 'operator' },
    { label: '0', action: () => handleNumber('0'), style: { gridColumn: 'span 2' } },
    { label: '=', action: handleEqual, type: 'operator' }
  ];

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Simple Calculator</h1>
      <div style={styles.calculatorBox}>
        <div style={styles.screen}>{display}</div>
        <div style={styles.grid}>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              style={{
                ...styles.btn,
                ...(btn.type === 'operator' ? styles.opBtn : {}),
                ...(btn.type === 'clear' ? styles.clearBtn : {}),
                ...btn.style
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: 'sans-serif' },
  title: {
    marginBottom: '20px',
    color: '#94a3b8',
    fontSize: '1.2rem',
    fontWeight: '500' },
  calculatorBox: {
    width: '320px',
    padding: '20px',
    borderRadius: '16px',
    backgroundColor: '#1e293b',
    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.3)' },
  screen: {
    width: '100%',
    height: '60px',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 15px',
    boxSizing: 'border-box',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#38bdf8',
    overflow: 'hidden' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px' },
  btn: {
    padding: '20px',
    fontSize: '1.25rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#334155',
    color: '#f8fafc',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.2s' },
  opBtn: {
    backgroundColor: '#f97316',
    color: '#fff' },
  clearBtn: {
    backgroundColor: '#ef4444',
    color: '#fff' }
};

export default App