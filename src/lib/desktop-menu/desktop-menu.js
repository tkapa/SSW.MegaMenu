import React from 'react';
import styles from './desktop-menu.module.css';
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../dropdown/dropdown';
import axios from 'axios';


class DesktopMenu extends React.Component {
  //const DesktopMenu = ({prefix}) => {
  constructor(props) {
    super(props);
    this.state = { menuModel: null };
  }

  loadMenuModel() {
    let currentComponent = this;
    axios.get('https://SSWConsulting.github.io/SSW.Website.Menu.json/menu.json')
      .then(function (response) {
        currentComponent.setState({ menuModel: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadMenuModel();
  }

  getRootUrl() {
    if (this.props.prefix && typeof window !== 'undefined') {
      return (
        window.location.origin
          ? window.location.origin + '/'
          : window.location.protocol + '/' + window.location.host + '/') + this.props.prefix + '/';
    }
    return '';
  }

  render() {
    return (
      <div className={cs(styles.menuDrop, styles.hiddenXs, styles.hiddenSm)}>
        <ul>
          {this.state.menuModel && this.state.menuModel.menuItems.map((item, index) => {
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
                        <img src={this.getRootUrl() + require("../images/" + item.groupImageUrl)} loading="lazy" />
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
  }
};
export default DesktopMenu;
