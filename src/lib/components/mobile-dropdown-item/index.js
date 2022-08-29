import React from 'react';
import {level1, ignore} from './index.module.css';

const MobileDropdownItem = ({ item, index }) => {
    return (
        <>
            <li key={index} className={level1} >
                <a href={item.navigateUrl ?  item.navigateUrl : null} className={ignore}>
                    {item.text}
                </a>
            </li>
        </>
    )
}

export default MobileDropdownItem;