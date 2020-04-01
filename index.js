import {buildMegaMenu,buildMobileMenu, registerEvents, registerMobileEvents} from './src/megamenu.js';

function mobilemenu() {
    const element = document.createElement('div');
    element.innerHTML = buildMobileMenu();
    return element;
}

  function desktopMenu() {
    const element = document.createElement('div');
    element.id="main-container";
    element.innerHTML = buildMegaMenu() ;
    return element;
  }
  document.body.appendChild(desktopMenu());
  document.body.appendChild(mobilemenu());
  registerEvents("main-container");
  registerMobileEvents();