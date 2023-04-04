import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { ImSearch } from "react-icons/Im";
import { GrCart } from "react-icons/gr";
function Header() {
  return (
    <nav className="header">
      {/* logo on the left -> img*/}
      <Link to="/">
        <img className="header_logo" src="/assets/logo.png" />
      </Link>

      {/* search box*/}
      <div className="header_search">
        <input type="text" className="header_searchInput" />
      </div>
      <div className="icon">
        <button>
          <ImSearch className="header_searchIcon" />
        </button>
      </div>

      {/* 3 links*/}
      <div className="headerNav">
        <Link to="/login" className="header_link">
          <div className="header_option">
            <span className="lineone">Hello User</span>
            <span className="linetwo">Sign In</span>
          </div>
        </Link>
        <Link to="/login" className="header_link">
          <div className="header_option">
            <span className="lineone">Returns</span>
            <span className="linetwo">& Orders</span>
          </div>
        </Link>
        <Link to="/login" className="header_link">
          <div className="header_option">
            <span className="lineone">Your</span>
            <span className="linetwo">Prime</span>
          </div>
        </Link>
        <Link to="/checkout" className="header_link">
          <div className="header_optionBasket">
            <GrCart style={{ color: "red" }} className="carticon" />
            <span>0</span>
          </div>
        </Link>
      </div>

      {/* Basket icon with number*/}
    </nav>
  );
}

export default Header;
