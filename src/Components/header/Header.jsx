import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #394f8a;
  margin: 0;
  height: 70px;
  display: flex;
  justify-content: center;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  font-size: 20px;
  font-family: "Josefin Sans", sans-serif;
  cursor: pointer;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/createProduct" style={{ color: "#fff" }}>
            Create Product
          </NavLink>
          <NavLink to="/" style={{ color: "#fff" }}>
            Product List
          </NavLink>
          <NavLink to="/cart" style={{ color: "#fff" }}>
            Cart
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;
