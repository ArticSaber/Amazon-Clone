import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";
import "./Header.css";
import { ImSearch } from "react-icons/Im";
import { IoMdArrowDropdown } from "react-icons/Io";
function Header() {
  const { Userid } = useContext(DataContext);
  const [showAll, setShowAll] = useState(false);
  return (
    <nav className="header">
      {/* logo on the left -> img*/}
      <Link to="/">
        <img className="header_logo" src="/assets/logo.png" />
      </Link>
      <div className="all-dropdown">
        <span onClick={()=>setShowAll(!showAll)} className="all-span">All
        <IoMdArrowDropdown />
        </span>
        {
          showAll && (
            <div>
              <ul className="all-list">
                <li>
                  All Departments
                </li>
              </ul>
            </div>
          )
        }
      </div>
      {/* search box*/}
      <div className="header_search">
        <input type="text" className="header_searchInput" />
      </div>
      <div className="icon">
        <button className="search-button">
          <ImSearch className="header_searchIcon" />
        </button>
      </div>

      {/* 3 links*/}
      <div className="headerNav">
        <Link to="/login" className="header_link">
          <div className="header_option">
            <span className="lineone">Hello User</span>
            <span className="linetwo">{!Userid ? "Sign In" : "Sign Out"}</span>
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
            <img className="carticon" src="/assets/Vector.png" />
            <span className="lineone linetwo gap">0</span>
          </div>
        </Link>
      </div>

      {/* Basket icon with number*/}
    </nav>
  );
}

export default Header;
