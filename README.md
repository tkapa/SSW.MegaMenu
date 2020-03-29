This project is the megamenu from www.ssw.com.au as a pure javascript component.

## Available functions
- buildMobileMenu(): return the html of the mobile menu as a string (side bar menu)
- buildMegaMenu(): return the html of the main menu as a string (desktop menu + menu bar for mobile)
- registerEvents(): must be called after 'buildMegaMenu()' to activate events for the search input and the mobile menu toggle
- registerMobileEvents(): must be called after 'buildMobileMenu()' to activate events for the side bar menu

## How to use
This is an exemple of how to use the component, it can vary depending on the framework of your application.

```
<div class="main-container">
    ...website content
    <div id="sswmegamenu"></div>
    ...more website content
</div>
<div id="mobilemenu"></div>

<script>
 document.getElementById("sswmegamenu").innerHTML = buildMegaMenu();
 document.getElementById("mobilemenu").innerHTML = buildMobileMenu();
 registerEvents();
 registerMobileEvents();
</script>
```

The div with the class name "main-container" is necessary to get the website content pushed when opening the mobile menu.
The mobile menu should sit outside the main container.

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
