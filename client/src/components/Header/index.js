import React, { useState } from 'react';
import './style.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logOutUser } from '../../store/actions/authActions';

const Header = ({auth, logOutUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    console.log("logging out");
    logOutUser();
  }

  return (
    <div className="header">
      <Navbar expand="md">
        <NavbarBrand href="/"><img src="/assets/HEADERLOGO.png" alt="logo"></img></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse  isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <NavLink id="aboutLink" className="link" href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="aboutLink" className="link" href="/blog">Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="aboutLink" className="link" href="/joblistings">Job Listings</NavLink>
            </NavItem>
            <NavItem>
              {
                ! auth.token ?
                <NavLink className="link" href="/login">Login</NavLink> : 
                <NavLink style={{cursor:"pointer"}} className="link" onClick={handleLogout}>Logout</NavLink>
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { logOutUser }))(Header);