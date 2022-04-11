import { useState } from 'react';

import SharedAxisX from './components/SharedAxisX';

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

const App = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      <div>
        <SharedAxisX step={step} className='container'>
          {steps}
        </SharedAxisX>
      </div>
      <div className='counter'>
        <button
          disabled={step <= 0}
          onClick={() => setStep((prev) => prev - 1)}
        >
          -
        </button>
        <span>{step}</span>
        <button
          disabled={step >= steps.length - 1}
          onClick={() => setStep((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default App;
