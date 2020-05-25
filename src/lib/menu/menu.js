import React from 'react';
import styles from './menu.module.css'
import DesktopMenu from '../desktop-menu/desktop-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import cs from 'classnames';

const searchUrl = `https://www.google.com.au/search?q=site:ssw.com.au%20`;

const Menu = ({ onClickToggle, prefix }) => {
    const menu_Search = (search) => {
        if (window) {
            window.open(searchUrl + search);
        }
    };

    const handleKeyDownOnMenuSearchInput = (event) => {
        if (event.key === 'Enter') {
            menu_Search(event.target.value);
        }
    }

    return (
        <div className={styles.MegaMenu}>
            <div className={styles.menuContent}>
                <div className={cs(styles.menuMobile, styles.visibleXs, styles.visibleSm)}>
                    <div className={styles.sbToggleLeft} onClick={() => onClickToggle()} >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <DesktopMenu prefix={prefix}></DesktopMenu>
                <div className={styles.menuSearch}>
                    <input type="text" className={styles.searchBox} onKeyDown={(event) => handleKeyDownOnMenuSearchInput(event)} />
                </div>
            </div>
        </div>
    )
}

export default Menu;