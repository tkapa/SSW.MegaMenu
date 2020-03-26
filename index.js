import {buildMegaMenu, registerEvents} from './src/megamenu.js';

  function component() {
    const element = document.createElement('div');
    element.innerHTML = buildMegaMenu();
    return element;
  }
  document.body.appendChild(component());
  registerEvents();