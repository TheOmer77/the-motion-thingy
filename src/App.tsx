import { useState } from 'react';

import SharedAxis from './components/SharedAxis';
import { Axis } from './types/SharedAxis';

const steps = [
  <div key={0} className='item'>
    0
  </div>,
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
];

const axisValues: { label: string; value: Axis }[] = [
  { label: 'X', value: 'x' },
  { label: 'Y', value: 'y' },
  { label: 'Z', value: 'z' },
];

const App = () => {
  const [step, setStep] = useState(0),
    [axis, setAxis] = useState<Axis>('x'),
    [fadeVariant, setFadeVariant] = useState(false);

  return (
    <>
      <div>
        <SharedAxis
          axis={axis}
          step={step}
          fadeVariant={fadeVariant}
          className='container'
        >
          {steps}
        </SharedAxis>
      </div>
      <div className='control-column'>
        <div className='control-line gap-0.5'>
          <button
            disabled={step <= 0}
            onClick={() => setStep((prev) => prev - 1)}
          >
            -
          </button>
          <div className='button-group'>
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setStep(index)}
                aria-pressed={step === index}
              >
                {index}
              </button>
            ))}
          </div>
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
        <div className='control-line gap-0.5'>
          <button
            className='small'
            aria-pressed={fadeVariant}
            onClick={() => setFadeVariant((prev) => !prev)}
          >
            {fadeVariant ? '✓' : ' '}
          </button>
          <span className='title'>Fade variant</span>
        </div>
      </div>
    </>
  );
};

export default App;
