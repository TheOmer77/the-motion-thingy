import classNames from 'classnames';
import { useState } from 'react';

import SharedAxis from './components/SharedAxis';
import useRtl from './hooks/useRtl';
import { Axis } from './types/SharedAxis';

const steps = [...Array(5)].map((_, index) => (
  <div key={index} className='item'>
    {index}
  </div>
));

const axisValues: { label: string; value: Axis }[] = [
  { label: 'X', value: 'x' },
  { label: 'Y', value: 'y' },
  { label: 'Z', value: 'z' },
];

const App = () => {
  const [step, setStep] = useState(0),
    [axis, setAxis] = useState<Axis>('x'),
    [fadeVariant, setFadeVariant] = useState(false),
    [linearTransitions, setLinearTransitions] = useState(false),
    [rtl, setRtl] = useRtl();

  return (
    <>
      <SharedAxis
        axis={axis}
        step={step}
        fadeVariant={fadeVariant}
        className={classNames(
          'container',
          linearTransitions && 'linear-transitions'
        )}
      >
        {steps}
      </SharedAxis>
      <div className='control-column'>
        <div className='control-line gap-0.5'>
          <button
            disabled={step <= 0}
            onClick={() => setStep(prev => prev - 1)}
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
            onClick={() => setStep(prev => prev + 1)}
          >
            +
          </button>
        </div>
        <div className='control-line gap-0.5'>
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
            onClick={() => setFadeVariant(prev => !prev)}
          >
            {fadeVariant ? '✓' : ' '}
          </button>
          <span className='title'>Fade variant</span>
        </div>
        <div className='control-line gap-0.5'>
          <button
            className='small'
            aria-pressed={linearTransitions}
            onClick={() => setLinearTransitions(prev => !prev)}
          >
            {linearTransitions ? '✓' : ' '}
          </button>
          <span className='title'>Linear transitions</span>
        </div>
        <div className='control-line gap-0.5'>
          <button
            className='small'
            aria-pressed={rtl}
            onClick={() => setRtl(prev => !prev)}
          >
            {rtl ? '✓' : ' '}
          </button>
          <span className='title'>RTL</span>
        </div>
      </div>
    </>
  );
};

export default App;
