import React, { Component } from 'react';
import { Link } from 'react-router';

import { Button, Nav, Navbar, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <div className="navbar-inverse bg-inverse">
          <div className="container d-flex justify-content-between">
            <Link to="/" className="navbar-brand">My Youtube</Link>
            <Nav className="navbar-nav" pullRight>
              <IndexLinkContainer to="/">
                <NavItem eventKey={1}>Home</NavItem>
              </IndexLinkContainer>
              <LinkContainer to="/MyList">
                <NavItem eventKey={2}>My List</NavItem>
              </LinkContainer>
            </Nav>
          </div>
        </div>
        { children }
      </div>
    );
  }
}
