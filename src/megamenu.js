import './megamenu.css';
//import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
import itemsJson from './menu.json';

var isMenuOpened = false;
const searchUrl = `https://www.google.com.au/search?q=site:ssw.com.au%20`;

const menuItems = itemsJson.menuItems;

function CountChildren(items) {
    let count = items.length;
    items.forEach(level1 => {
        if (level1.children) {
            count += level1.children.length;
        }
    })
    return count;
};


function buildDesktopMenu() {
    let desktopmenu = `<div class="menu-drop hidden-xs hidden-sm">
                        <ul>`
    menuItems.forEach((item, index) => {
        desktopmenu += `<li>`;

        if (!item.children) {
            desktopmenu += `<a href=${item.navigateUrl ? item.navigateUrl : "javascript:void(0)"} class="ignore ignore no-dropdown">
                        ${item.text}
                        </a>`
        } else {
            desktopmenu += `  <a href="javascript:void(0)" class="ignore ">
                                ${item.text} <i class="fa fa-angle-down"></i>
                            </a>
                            <div class="Menu">
                                <div class="MenuImg">
                                <img src=${item.groupImageUrl} loading="lazy"/>
                                </div>
                                <div class="MenuWrapper row">
                                ${createLevel1(item.children)}
                                </div>
                            </div>`;
        }
        desktopmenu += `</li>`;
    });


    desktopmenu += `    </ul>
                    </div>`
    return desktopmenu;
}

function createLevel1(items, mobile) {
    let countChildren = CountChildren(items);
    let currentIndex = 0;
    let level1 = `<ul class="col-md-3 ${mobile ? "dropdown-menu" : ""}">`;
    let currentColumn = 1;
    items.forEach(level1Item => {
        if (level1Item.breakListBefore && !mobile) {
            level1 += '</ul><ul class="col-md-3">';
            currentIndex = 0;
            currentColumn++;
        }
        currentIndex++;
        level1 += ` <li class='${level1Item.navigateUrlOnMobileOnly && !mobile ? "NonClickableMenuItem level1" : "level1"}' >
                        <a href=${(level1Item.navigateUrlOnMobileOnly && mobile) || !level1Item.navigateUrlOnMobileOnly ? level1Item.navigateUrl : "javascript:void(0)"}  class="ignore">
                            ${level1Item.text}
                        </a>
                    </li>
                    ${!mobile && level1Item.children ? createLevel2(level1Item.children, countChildren, currentIndex, currentColumn) : ""}`;
    });
    level1 += '</ul>';
    return level1;
}
function createLevel2(items, countChildren, currentIndex, currentColumn) {
    let level2 = '';
    items.forEach(level2Item => {
        currentIndex++;
        if (level2Item.breakListBefore || currentIndex > countChildren / currentColumn) {
            level2 += '</ul><ul class="col-md-3">';
            currentColumn++;
            currentIndex = 0;
        }
        level2 += `<li class='${(level2Item.cssClass ? level2Item.cssClass : "") + " level2"}'>
                    <a href=${level2Item.navigateUrl ? level2Item.navigateUrl : "javascript:void(0)"} class="ignore">
                        ${level2Item.text}
                    </a>
                </li>`;
    });
    return level2;
}

function search(search) {
    if (window) {
        window.location.href = searchUrl + search;
    }
};

function buildMobileMenu() {
    let mobileMenu = `<div class="sb-slidebar sb-left" id="slide-bar">
      <div class="menu-drop navbar-collapse">
        <ul class="nav navbar-nav">`;
    menuItems.forEach((item, index) => {
        mobileMenu += `<li class="dropdown">`;
        if (!item.children) {
            mobileMenu += `<a href='${item.navigateUrl}' class="ignore ignore no-dropdown">
                                ${item.text}
                            </a>`;
        }
        else {
            mobileMenu += `<a href="javascript:void(0)" class="dropdown-toggle ${item.CssClass}">
                    ${item.text} <i class="fa fa-angle-down"></i>
                  </a>        
                ${createLevel1(item.children, true)}`
        }
        mobileMenu += `</li>`;
    })
    mobileMenu += ` </ul>
                    </div>
                    </div>`;
    return mobileMenu;
}


function buildMegaMenu() {
    const desktopMenu = buildDesktopMenu();

    var menuHtml = `
        <div id="MegaMenu">
            <div class="menu-content">
            <div class="menu-mobile visible-xs visible-sm" >
                <a  class="sb-toggle-left" id="menuToggle">
                <i class="fa fa-bars"></i>
                </a>
            </div>`;

    menuHtml += desktopMenu;
    menuHtml += `
                <div class="menu-search search-input">
                    <input type="text" class="search-box" id="search" />
                </div>
            </div>
        </div>
    <div>`;
    menuHtml += '</div>';
    return menuHtml

};

function closeOpenedElements(){
    var openedItems = document.getElementsByClassName("dropdown open");
    for (let item of openedItems) {
        item.className = "dropdown"
    }
}

function openElement(element){
    element.className = "dropdown open";
}

function closeElement(element){
    element.className = "dropdown";
}

function registerMobileEvents() {
    document.getElementById("slide-bar").addEventListener('click', function (event) {
        if (event.target.parentNode.className === "dropdown" ) {
            closeOpenedElements()
            openElement(event.target.parentNode);
        } else if (event.target.parentNode.parentNode.className === "dropdown" ) {
            closeOpenedElements();
            openElement(event.target.parentNode.parentNode);
        } else if (event.target.parentNode.className === "dropdown open") {
            closeElement(event.target.parentNode);
        } else if (event.target.parentNode.parentNode.className === "dropdown open") {
            closeElement(event.target.parentNode.parentNode);
        }
    });
}

function registerEvents(mainContentElementId, mobileMenuOpeningCallBack) {
    if (typeof window !== 'undefined') {
        addMobileMenuToggleEvent(mainContentElementId, mobileMenuOpeningCallBack);
        addSearchEvent();
        return true;
    }
}

function addSearchEvent() {
    document.getElementById("search").addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            search(event.target.value);
        }
    });
}

function addMobileMenuToggleEvent(mainContentElementId, mobileMenuOpeningCallBack) {
    if(document.getElementById(mainContentElementId)){
        var mainContainer = document.getElementById(mainContentElementId);
        mainContainer.style.transition = "transform 400ms ease";
        document.getElementById("menuToggle").addEventListener('click', function (event) {
            isMenuOpened = !isMenuOpened;
            mainContainer.style.transform = isMenuOpened ? "translateX(84%)" : "translateX(0px)";
            document.getElementById("slide-bar").style.width = (isMenuOpened ? "84vw" : "0px");
            document.getElementById("slide-bar").className = "sb-slidebar sb-left " + (isMenuOpened ? "sb-active" : "");

            if(mobileMenuOpeningCallBack){
                mobileMenuOpeningCallBack(isMenuOpened);
            }

            var clickOutside = () => {
                isMenuOpened = false;
                mainContainer.style.transform = "translateX(0px)";
                document.getElementById("slide-bar").style.width = "0px";
                document.getElementById("slide-bar").className = "sb-slidebar sb-left ";
                if(mobileMenuOpeningCallBack){
                    mobileMenuOpeningCallBack(isMenuOpened);
                }
            };
            event.stopPropagation();
            if (isMenuOpened) {
                mainContainer.addEventListener('click', clickOutside);
            } else {
                mainContainer.removeEventListener('click', clickOutside);
            }
        });
    }
}

export { buildMobileMenu, buildMegaMenu, registerEvents, registerMobileEvents };