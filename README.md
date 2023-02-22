## How to use the Mega Menu

### Installation

1. install package
```bash
npm install ssw.megamenu
```
2. import global styles
```javascript
import "ssw.megamenu/dist/style.css";
```
3. use components in your project
```javascript
// commonjs
const { Menu, MobileMenu, MenuBar } = require('ssw.megamenu');
// es module
import { Menu, MobileMenu, MenuBar } from 'ssw.megamenu';
```

### Usage

The Megame Menu is split in 3 components to give more freedom on how the mobile menu interact with the website.

The 3 components are:

- `<Menu />`: this component is used to display the desktop menu
- `<MobileMenu />`: this component is used to display the mobile menu
- `<MenuBar />` [Recommended]: this component is a ready-to-use menu using `<Menu />` and `<MobileMenu />`

#### Example of implementation:

1. With `<MenuBar />`

```jsx
import React, { useState, useRef } from 'react';
import { Menu, MobileMenu } from 'ssw.megamenu';
import './App.css';

function App() {
  return (
    <MenuBar
      className="App"
      header={<header className="App-header">Test MenuBar</header>}
    >
      <div>Some content</div>
    </MenuBar>
  );
}

```

2. With `<Menu />` and `<MobileMenu />`

```jsx
import React, { useState, useRef } from 'react';
import { Menu, MobileMenu } from 'ssw.megamenu';
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
```

### Static assets

1. Menu items | /lib/assets/data/menu.json
2. Images | /lib/assets/images/*

## How to contribute?

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />

### `yarn build`

Builds the lib for production to the `dist` folder.<br />

### How to publish?

1. **Important: Before to push your changes, you need to increment the version number in the file package.json**
2. Make a pull request to integrate your code into the main branch.
3. Get the pull request approved
4. Merged your code into main branch
5. Package published by github actions
