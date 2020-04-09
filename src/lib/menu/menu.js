import React from 'react';
import styles from './menu.module.css'
import DesktopMenu from '../desktop-menu/desktop-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import cs from 'classnames';

const searchUrl = `https://www.google.com.au/search?q=site:ssw.com.au%20`;

const Menu = ({ onClickToggle }) => {
    const search = (search) => {
        if (window) {
            window.location.href = searchUrl + search;
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search(event.target.value);
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
                <DesktopMenu></DesktopMenu>
                <div className={styles.menuSearch}>
                    <input type="text" className={styles.searchBox} onKeyDown={(event) => handleKeyDown(event)} />
                </div>
            </div>
        </div>
    )
}

export default Menu;