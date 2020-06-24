import React from 'react';
import styles from './menu.module.css'
import DesktopMenu from '../desktop-menu/desktop-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import cs from 'classnames';
import axios from 'axios';

const searchUrl = `https://www.google.com.au/search?q=site:ssw.com.au%20`;

var menuModel = require('../data/menu.json');
//const Menu = ({ onClickToggle, prefix }) => {


    class Menu extends React.Component {
        //const DesktopMenu = ({prefix}) => {
        constructor(props) {
          super(props);
          this.state = { menuModel: menuModel };
        }
      
        loadMenuModel() {
        if (this.state.menuModel=== menuModel){
          let currentComponent = this;
          axios.get('https://SSWConsulting.github.io/SSW.Website.Menu.json/menu.json')
            .then(function (response) {
              currentComponent.setState({ menuModel: response.data });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        }
       componentDidMount(){
            this.loadMenuModel();
        }
    menu_Search(search){
        if (window) {
            window.open(searchUrl + search);
        }
    }

    handleKeyDownOnMenuSearchInput(event){
        if (event.key === 'Enter') {
            this.menu_Search(event.target.value);
        }
    }

    render(){
    return (
       // this.state.menuModel &&
        <div className={styles.MegaMenu}>
            <div className={styles.menuContent}>
                <div className={cs(styles.menuMobile, styles.visibleXs, styles.visibleSm)}>
                    <div className={styles.sbToggleLeft} onClick={() => this.props.onClickToggle()} >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <DesktopMenu prefix={this.props.prefix} menuModel={this.state.menuModel}></DesktopMenu>
                <div className={styles.menuSearch}>
                    <input type="text" className={styles.searchBox} onKeyDown={(event) => this.handleKeyDownOnMenuSearchInput(event)} />
                </div>
            </div>
        </div>
    )
}
}

export default Menu;