import { create } from '@storybook/theming';

/** @param {'light' | 'dark'} variant */
const theme = variant => {
  const appBg = variant === 'dark' ? 'hsl(0, 0%, 3%)' : 'hsl(0, 0%, 93%)',
    appContentBg = variant === 'dark' ? 'hsl(0, 0%, 7%)' : 'hsl(0, 0%, 97%)',
    textColor = variant === 'dark' ? '#ddd' : '#222',
    textInverseColor = variant === 'dark' ? '#222' : '#ddd',
    textMutedColor =
      variant === 'dark' ? 'rgba(221, 221, 221, 0.5)' : 'rgba(34, 34, 34, 0.5)',
    colorPrimary = variant === 'dark' ? '#9494eb' : '#2929d6';

  const fontBase = 'var(--font-family)';

  return create({
    base: variant,

    colorPrimary,
    colorSecondary: colorPrimary,

    // UI
    appBg,
    appContentBg,
    appBorderColor: 'rgba(0, 0, 0, 0)',
    appBorderRadius: '1rem',

    // Typography
    fontBase,
    fontCode: 'monospace',

    // Text colors
    textColor,
    textInverseColor,
    textMutedColor,

    // Toolbar default and active colors
    barBg: appContentBg,

    // Form colors
    inputBg: 'rgba(0, 0, 0, 0)',
    inputBorder: textMutedColor,
    inputBorderRadius: '0.5rem',

    brandTitle: 'The motion thingy',
  });
};

export default theme;
