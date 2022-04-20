import { ComponentStory, ComponentMeta } from '@storybook/react';

import SharedAxis from '../../../src/components/SharedAxis';
import { SharedAxisProps } from '../../../src/types/SharedAxis';

import './index.css';

const steps = [...Array(6)].map((_, index) => (
  <div key={index} className='item'>
    {index}
  </div>
));

export default {
  title: 'Shared axis',
  component: SharedAxis,
  args: {
    step: 0,
    axis: 'x',
    fadeVariant: false,
    className: 'container',
    children: steps,
  },
  argTypes: {
    axis: {
      options: ['x', 'y', 'z'],
      control: { type: 'inline-radio' },
    },
    step: { control: { type: 'number', min: 0, max: 5 } },
  },
} as ComponentMeta<typeof SharedAxis>;

const Template: ComponentStory<typeof SharedAxis> = args => (
  <SharedAxis {...args} />
);

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

export const rtl = (args: SharedAxisProps) => (
  <div dir='rtl'>
    <SharedAxis {...args} />
  </div>
);
rtl.storyName = 'RTL support';
rtl.args = { axis: 'x' };
