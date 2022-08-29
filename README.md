This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Important: Before to push your changes, you need to increment the version number in the file package.json**

## How to use the Mega Menu

The Megame Menu is split in 2 components to give more freedom on how the mobile menu interact with the website. The 2 components are:

- Menu: this component is used to display the desktop menu
- Mobile menu: this component is used to display the mobile menu

Example of implementation:

```
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
```

### Menu content

The menu items are in /src/lib/assets/data/menu.json.
This is the file to modify when you want to add/remove items from the menu.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
