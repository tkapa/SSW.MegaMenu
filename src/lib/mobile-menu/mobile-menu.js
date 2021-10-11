import React from "react";
import {
  dropdown,
  open,
  sbSlidebar,
  sbLeft,
  menuDrop,
  navbarCollapse,
  ignore,
  dropdownToggle,
  dropdownMenu,
  navbarNav,
} from "./mobile-menu.module.css";
import cs from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import MobileDropdownItem from "../mobile-dropdown-item/mobile-dropdown-item";
import axios from "axios";

class MobileMenu extends React.Component {
  //const DesktopMenu = ({prefix}) => {
  constructor(props) {
    super(props);
    this.state = { menuModel: null };
  }

  loadMenuModel() {
    if (!this.state.menuModel) {
      let currentComponent = this;
      axios
        .get("https://SSWConsulting.github.io/SSW.Website.Menu.json/menu.json")
        .then(function (response) {
          currentComponent.setState({ menuModel: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.loadMenuModel();
  }

  closeOpenedElements() {
    var openedItems = document.getElementsByClassName(cs(dropdown, open));
    for (let item of openedItems) {
      item.className = dropdown;
    }
  }

  openElement(element) {
    element.className = cs(dropdown, open);
  }

  closeElement(element) {
    element.className = dropdown;
  }

  openItem(event) {
    if (event.target.parentNode.className === dropdown) {
      this.closeOpenedElements();
      this.openElement(event.target.parentNode);
    } else if (event.target.parentNode.parentNode.className === dropdown) {
      this.closeOpenedElements();
      this.openElement(event.target.parentNode.parentNode);
    } else if (event.target.parentNode.className === cs(dropdown, open)) {
      this.closeElement(event.target.parentNode);
    } else if (
      event.target.parentNode.parentNode.className === cs(dropdown, open)
    ) {
      this.closeElement(event.target.parentNode.parentNode);
    }
  }

  render() {
    return (
      <div
        className={cs(sbSlidebar, sbLeft)}
        style={{ width: this.props.isMenuOpened ? "84vw" : "0px" }}
        onClick={(event) => this.openItem(event)}
      >
        <div className={cs(menuDrop, navbarCollapse)}>
          <ul className={navbarNav}>
            {this.state.menuModel &&
              this.state.menuModel.menuItems.map((item, index) => {
                if (!item.children) {
                  return (
                    <li key={index} className={dropdown}>
                      <a
                        href={item.navigateUrl ? item.navigateUrl : null}
                        className={cs(ignore, "unstyled")}
                      >
                        {item.text}
                      </a>
                    </li>
                  );
                } else if (item.children) {
                  return (
                    <li key={index} className={dropdown}>
                      <a className={cs(dropdownToggle, "unstyled")}>
                        {item.text} <FontAwesomeIcon icon={faAngleDown} />
                      </a>
                      <ul className={dropdownMenu}>
                        {item.children.map((level1Item, indexLevel1) => {
                          return (
                            <MobileDropdownItem
                              key={indexLevel1}
                              item={level1Item}
                            ></MobileDropdownItem>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    );
  }
}
export default MobileMenu;
