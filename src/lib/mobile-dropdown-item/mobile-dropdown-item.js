import React from 'react';
import styles from './mobile-dropdown-item.module.css';

const MobileDropdownItem = ({ item, index }) => {
    return (
        <>
            <li key={index} className={styles.level1} >
                <a href={item.navigateUrl ? window.location.host.indexOf('sswcomau-stage') > -1 ? item.navigateUrl.replace("www.ssw.com.au", window.location.host) : item.navigateUrl : null} className={styles.ignore}>
                    {item.text}
                </a>
            </li>
        </>
    )
}

export default MobileDropdownItem;