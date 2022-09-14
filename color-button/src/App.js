import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [color, setColor] = useState('MediumVioletRed');
  const [disabled, setDisabled] = useState(false);
  let newColor = color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  const setColorHandler = (value) => {
    setColor(value);
  };
  return (
    <div className="App">
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? 'gray' : color }}
        onClick={() => setColorHandler(newColor)}
      >
        Change To {replaceCamelWithSpaces(newColor)}
      </button>

      <input
        type="checkbox"
        id="disabled-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor='disabled-button-checkbox'>Disabled Button</label>
    </div>
  );
}

export default App;
