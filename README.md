This project is the megamenu from www.ssw.com.au as a pure javascript component.

## Available functions
- buildMobileMenu(): return the html of the mobile menu as a string (side bar menu)
- buildMegaMenu(): return the html of the main menu as a string (desktop menu + menu bar for mobile)
- registerEvents(): must be called after 'buildMegaMenu()' to activate events for the search input and the mobile menu toggle
- registerMobileEvents(): must be called after 'buildMobileMenu()' to activate events for the side bar menu

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.<br />

## Release

Release build the npm package and publish it on the SSWWebsite npm registry.

Important: the package version must be updated before release.
