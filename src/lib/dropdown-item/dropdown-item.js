import React from 'react';
import styles from './dropdown-item.module.css';
import cs from 'classnames';


const DropdownItem = ({ item, index }) => {
    return (
        <>
            {item.level === 1 &&
                <li key={index} className={item.data.navigateUrlOnMobileOnly ? cs(styles.NonClickableMenuItem, styles.level1) : styles.level1} >
                    <a href={!item.data.navigateUrlOnMobileOnly ? item.data.navigateUrl : null} className={cs(styles.ignore, 'unstyled')}>
                        {item.data.text}
                    </a>
                </li>
            }
            {item.level === 2 &&
                <li key={index} className={(item.data.cssClass ? cs(styles[item.data.cssClass], styles.ClickableMenuItem, styles.level2) : cs(styles.ClickableMenuItem, styles.level2))}>
                    <a href={item.data.navigateUrl ? item.data.navigateUrl : null} className={cs(styles.ignore, 'unstyled')}>
                        {item.data.text}
                    </a>
                </li>
            }
        </>
    )
}

export default DropdownItem;