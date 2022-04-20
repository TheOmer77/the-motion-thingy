import theme from './theme';

const getColorScheme = matches => {
  return matches ? 'dark' : 'light';
};

const queryWindowMatchMedia = () => {
  return (
    window &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)')
  );
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  docs: { theme: theme(getColorScheme(queryWindowMatchMedia().matches)) },
};
