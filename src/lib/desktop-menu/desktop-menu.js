import React from 'react';
import styles from './desktop-menu.module.css';
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../dropdown/dropdown';

let menuModel = require('../data/menu.json');

const DesktopMenu = ({prefix}) => {

  const getRootUrl= () => {
    if (prefix && typeof window !== 'undefined'){
   return (
    window.location.origin 
        ? window.location.origin + '/'
        : window.location.protocol + '/' + window.location.host + '/')+prefix + '/';
      }
};


  return (
    <div className={cs(styles.menuDrop, styles.hiddenXs, styles.hiddenSm)}>
      <ul>
        {menuModel.menuItems.map((item, index) => {
          return (
            <li key={index}>
              {!item.children && (
                <a
                  href={item.navigateUrl ? item.navigateUrl : null}
                  className={cs(styles.ignore, 'unstyled')}>
                  {item.text}
                </a>
              )}{' '}
              {item.children && (
                <>
                  <a className={cs(styles.ignore, 'unstyled')}>
                    {item.text} <FontAwesomeIcon icon={faAngleDown} />
                  </a>
                  <div className={styles.Menu}>
                    <div className={styles.MenuImg}>
                      <img src={getRootUrl()+require("../images/" + item.groupImageUrl)} loading="lazy" />
                    </div>
                    <Dropdown items={item.children}></Dropdown>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default DesktopMenu;
