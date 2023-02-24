import React from 'react';
import Menu from '../menu';
import MobileMenu from '../mobile-menu';
import Portal from '../../utils/portal';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.popupMenu = React.createRef();
    this.container = this.props.container || document.body;
    this.state = {
      isMenuOpened: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onClose.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClose.bind(this));
  }

  onOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  onClose(e) {
    if (
      this.state.isMenuOpened &&
      this.popupMenu.current &&
      !this.popupMenu.current.contains(e.target)
    ) {
      this.setState({ isMenuOpened: false });
    }
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <Menu onClickToggle={(e) => this.onOpen(e)} />
        <Portal className={this.props.overlayClassName}>
          <MobileMenu
            ref={this.popupMenu}
            isMenuOpened={this.state.isMenuOpened}
          />
        </Portal>
      </div>
    );
  }
}

export default MenuBar;
