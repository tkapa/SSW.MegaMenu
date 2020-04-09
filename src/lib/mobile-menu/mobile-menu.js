import React from 'react';
import styles from './mobile-menu.module.css';
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import MobileDropdownItem from '../mobile-dropdown-item/mobile-dropdown-item';
let menuModel = require('../data/menu.json');

const MobileMenu = ({ isMenuOpened }) => {
  const closeOpenedElements = () => {
    var openedItems = document.getElementsByClassName(cs(styles.dropdown, styles.open));
    for (let item of openedItems) {
      item.className = styles.dropdown;
    }
  };

  const openElement = (element) => {
    element.className = cs(styles.dropdown, styles.open);
  };

  const closeElement = (element) => {
    element.className = styles.dropdown;
  };
  const openItem = (event) => {
    if (event.target.parentNode.className === styles.dropdown) {
      closeOpenedElements();
      openElement(event.target.parentNode);
    } else if (event.target.parentNode.parentNode.className === styles.dropdown) {
      closeOpenedElements();
      openElement(event.target.parentNode.parentNode);
    } else if (event.target.parentNode.className === cs(styles.dropdown, styles.open)) {
      closeElement(event.target.parentNode);
    } else if (event.target.parentNode.parentNode.className === cs(styles.dropdown, styles.open)) {
      closeElement(event.target.parentNode.parentNode);
    }
  };

  return (
    <div
      className={cs(styles.sbSlidebar, styles.sbLeft)}
      style={{ width: isMenuOpened ? '84vw' : '0px' }}
      onClick={(event) => openItem(event)}
    >
      <div className={cs(styles.menuDrop, styles.navbarCollapse)}>
        <ul className={styles.navbarNav}>
          {menuModel.menuItems.map((item, index) => {
            if (!item.children) {
              return (
                <li key={index} className={styles.dropdown}>
                  <a href={item.navigateUrl} className={cs(styles.ignore, 'unstyled')}>
                    {item.text}
                  </a>
                </li>
              );
            } else if (item.children) {
              return (
                <li key={index} className={styles.dropdown}>
                  <a className={cs(styles.dropdownToggle, 'unstyled')}>
                    {item.text} <FontAwesomeIcon icon={faAngleDown} />
                  </a>
                  <ul className={styles.dropdownMenu}>
                    {item.children.map((level1Item, indexLevel1) => {
                      return (
                        <MobileDropdownItem key={indexLevel1} item={level1Item} ></MobileDropdownItem>
                      )
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
};
export default MobileMenu;
