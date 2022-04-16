import { useState } from 'react';

import SharedAxis from './components/SharedAxis';

const steps = [
  <div key={1} className='item'>
    1
  </div>,
  <div key={2} className='item'>
    2
  </div>,
  <div key={3} className='item'>
    3
  </div>,
  <div key={4} className='item'>
    4
  </div>,
  <div key={5} className='item'>
    5
  </div>,
];

/**
 * @type {{
 *  label: string;
 *  value: import('./components/SharedAxis').Axis;
 * }[]}
 */
const axisValues = [
  { label: 'X', value: 'x' },
  { label: 'Y', value: 'y' },
  { label: 'Z', value: 'z' },
];

const App = () => {
  const [step, setStep] = useState(0),
    /** @type {[import('./components/SharedAxis').Axis, React.Dispatch<React.SetStateAction<import('./components/SharedAxis').Axis>>]} */
    [axis, setAxis] = useState('x');

  return (
    <>
      <div>
        <SharedAxis axis={axis} step={step} className='container'>
          {steps}
        </SharedAxis>
      </div>
      <div className='control-line'>
        <button
          disabled={step <= 0}
          onClick={() => setStep((prev) => prev - 1)}
        >
          -
        </button>
        <span className='counter title'>{step}</span>
        <button
          disabled={step >= steps.length - 1}
          onClick={() => setStep((prev) => prev + 1)}
        >
          +
        </button>
      </div>
      <div className='control-line'>
        <span className='title'>Axis:</span>
        <div className='button-group'>
          {axisValues.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setAxis(value)}
              aria-pressed={axis === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
