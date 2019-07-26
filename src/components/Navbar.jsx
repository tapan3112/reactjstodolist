import React from 'react';
import { connect } from 'react-redux'
import { store } from './../index'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class TodoNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand >React-Todo-Demo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => store.dispatch({ type: 'LOGOUT' })}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    token: state.auth.token || localStorage.getItem('todoToken'),
    name: state.auth.name || localStorage.getItem('todoUsername')
  })
}

export default connect(mapStateToProps, {}, null, { pure: false })(TodoNavbar)