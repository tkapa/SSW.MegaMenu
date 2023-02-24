import React, { useState, useRef } from 'react';
import { Menu, MobileMenu, MenuBar } from '../lib';
import './App.css';

function App() {
  const node = useRef();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const actionOnToggleClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      setIsMenuOpened(false);
    }
  };

  return (
    <>
      <header className="App-header">Test MenuBar</header>
      <MenuBar className="App" />
      <div>Some content</div>

      <div
        ref={node}
        className="App"
        onMouseDown={isMenuOpened ? (event) => handleClick(event) : null}
        style={{
          transform: isMenuOpened ? 'translateX(84%)' : 'translateX(0px)',
        }}
      >
        <header className="App-header">Test Menu and MobileMenu</header>
        <Menu onClickToggle={() => actionOnToggleClick()} prefix="."></Menu>
        <div>Some content</div>
      </div>
      <MobileMenu isMenuOpened={isMenuOpened}></MobileMenu>
    </>
  );
}

export default App;
