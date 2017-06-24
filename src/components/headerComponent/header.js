import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';

import {
  Link
} from 'react-router-dom';

class Header extends Component {
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
      <div className="App">
        <header>
          <Navbar color="faded" light toggleable>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand className="logo" href="./">Weber Pinterest</NavbarBrand>
            <input type="text" id="headerSearchBar" className="form-control" placeholder="Search for..." />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/">Explore</Link>
                </NavItem>
                <NavItem>
                  <Link to="/Boards">Boards</Link>
                </NavItem>
                <NavItem>
                  <Link to="/Profile">Profile</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Header;
