import React, { useState, useRef } from 'react';
import Menu from './lib/components/menu';
import MobileMenu from './lib/components/mobile-menu';
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
      <div
        ref={node}
        className="App"
        onMouseDown={isMenuOpened ? (event) => handleClick(event) : null}
        style={{
          transform: isMenuOpened ? 'translateX(84%)' : 'translateX(0px)',
        }}
      >
        <header className="App-header">Test MegaMenu</header>
        <Menu onClickToggle={() => actionOnToggleClick()} prefix="."></Menu>
        <div> Some content</div>
      </div>
      <MobileMenu isMenuOpened={isMenuOpened}></MobileMenu>
    </>
  );
}

export default App;
