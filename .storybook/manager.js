import { addons } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';

import theme from './theme.js';

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

// Set initial config
addons.setConfig({
  theme: theme(getColorScheme(queryWindowMatchMedia().matches)),
  panelPosition: 'right',
  isToolshown: false,
  resizerNav: { x: 256, y: 0 },
});

// Automatically switch light/dark theme based on system pref.
addons.register('auto-theme-switcher', api => {
  let currTheme = getColorScheme(queryWindowMatchMedia().matches);

  queryWindowMatchMedia().addEventListener('change', e => {
    const updatedTheme = getColorScheme(e.matches);
    if (currTheme !== updatedTheme) {
      currTheme = updatedTheme;
      api.setOptions({ theme: theme(updatedTheme) });
      addons.getChannel().emit(FORCE_RE_RENDER);

      // Because of issue below, we can do iframe reload for now.
      // https://github.com/storybookjs/storybook/issues/10523
      const addonDocElem = document.getElementById('storybook-preview-iframe');
      addonDocElem.src = addonDocElem.src;
    }
  });
});
