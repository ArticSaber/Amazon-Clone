import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import supabase from "../supabase";
import { ImSearch } from "react-icons/Im";
import { IoMdArrowDropdown } from "react-icons/Io";
import { DataContext } from "./DataProvider";
import { useNavigate } from "react-router-dom";
function Header() {
  const { Userid, setUserid, cartItems } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    console.log(error);
    setUserid(null);
    if (!Userid) nav("/login");
  };
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="header">
      {/* logo on the left -> img*/}
      <Link to="/">
        <img className="header_logo" src="/assets/logo.png" />
      </Link>
      <div className="dropdown">
        <span onClick={toggleDropdown} className="all-span">
          All
          <IoMdArrowDropdown />
        </span>
        {isOpen && (
          <div className="dropdown-menu">
            <div>All Categoties</div>
            <div>Alexa Skills</div>
            <div>Amazon Devices</div>
            <div>Amazon Fashion</div>
            <div>Amazon Fresh</div>
            <div>Amazon Pharmacy</div>
            <div>Appliances</div>
            <div>Apps & games</div>
            <div>Baby</div>
            <div>Beauty</div>
            <div>Books</div>
            <div>Car & Motorbike</div>
            <div>Car & Motorbike</div>
            <div>Car & Motorbike</div>
            <div>Car & Motorbike</div>
          </div>
        )}
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
        {!Userid ? (
          <Link to="/login" className="header_link">
            <div className="header_option">
              <span className="lineone">Hello User</span>
              <span className="linetwo">Sign In</span>
            </div>
          </Link>
        ) : (
          <div className="header_link">
            <div className="header_option">
              <span className="lineone">Hello User</span>
              <div className="linetwo" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        )}
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
            <span className="lineone linetwo gap">{cartItems.length}
    </span>
          </div>
        </Link>
      </div>

      {/* Basket icon with number*/}
    </nav>
  );
}

export default Header;
