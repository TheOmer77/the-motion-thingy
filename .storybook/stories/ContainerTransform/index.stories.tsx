import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import ContainerTransform from '../../../src/components/ContainerTransform';
import CollapsedComponent from '../../../src/components/ContainerTransform/CollapsedComponent';
import ExpandedComponent from '../../../src/components/ContainerTransform/ExpandedComponent';
import { ContainerTransformProps } from '../../../src/types/ContainerTransform';

import './index.css';

const ITEMS_COUNT = 25;

const numberWithSuffix = (number: number) => {
  const digits = String(number)
    .split('')
    .map(digit => Number(digit));
  const lastDigit = digits[digits.length - 1];

  return (number < 10 || number > 20) && lastDigit > 0 && lastDigit < 4
    ? lastDigit === 1
      ? number + 'st'
      : lastDigit === 2
      ? number + 'nd'
      : lastDigit === 3 && number + 'rd'
    : number + 'th';
};

const listItems: { primaryText: string; secondaryText: string }[] = [
  ...Array(ITEMS_COUNT),
].map((_, index) => ({
  primaryText: `List Item ${index + 1}`,
  secondaryText: `I am the ${numberWithSuffix(index + 1)} item!`,
}));

export default {
  title: 'Container Transform',
  component: ContainerTransform,
  args: { expanded: false },
  argTypes: {
    expanded: { type: 'boolean' },
  },
} as ComponentMeta<typeof ContainerTransform>;

const Template: ComponentStory<typeof ContainerTransform> = args => (
  <ContainerTransform {...args} />
);

export const Test = (args: ContainerTransformProps) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <div className='containerTransform container'>
      <div className='containerTransform list'>
        {listItems.map(({ primaryText, secondaryText }, index) => (
          <ContainerTransform
            key={`listItem-${index + 1}`}
            id={`listItem-${index + 1}`}
            expanded={expandedItem === index}
          >
            <CollapsedComponent>
              <button
                className='containerTransform listItem'
                onClick={() => setTimeout(() => setExpandedItem(index), 10)}
              >
                <span className='primaryText'>{primaryText}</span>
                <span className='secondaryText'>{secondaryText}</span>
              </button>
            </CollapsedComponent>
            <ExpandedComponent>
              <div className='containerTransform expandedComponent'>
                <div className='containerTransform container'>
                  <div>{primaryText}</div>
                  Lorem ipsum dolor sit amet.
                  <button onClick={() => setExpandedItem(null)}>Close</button>
                </div>
              </div>
            </ExpandedComponent>
          </ContainerTransform>
        ))}
      </div>
    </div>
  );
};

/*
export const xAxis = Template.bind({});
xAxis.storyName = 'X axis';
xAxis.args = { axis: 'x' };

export const yAxis = Template.bind({});
yAxis.storyName = 'Y axis';
yAxis.args = { axis: 'y' };

export const zAxis = Template.bind({});
zAxis.storyName = 'Z axis';
zAxis.args = { axis: 'z' };

export const fadeVariant = Template.bind({});
fadeVariant.storyName = 'Fade variant';
fadeVariant.args = { axis: 'z', fadeVariant: true };

export const customTransitions = Template.bind({});
customTransitions.storyName = 'Custom transitions';
customTransitions.args = {
  axis: 'x',
  className: 'container linear-transitions',
};

export const rtl = (args: ContainerTransformProps) => (
  <div dir='rtl'>
    <ContainerTransform {...args} />
  </div>
);
rtl.storyName = 'RTL support';
rtl.args = { axis: 'x' };
*/
