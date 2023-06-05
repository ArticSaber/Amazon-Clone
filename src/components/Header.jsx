import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabase";
import { RiSearch2Line } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { DataContext } from "./DataProvider";
import { useNavigate } from "react-router-dom";
import "./Header.css";
function Header() {
  const { Userid, setUserid, cartItems, UserName,state } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const nav = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else {
      toast.info("Successfully logged out!");
      setUserid(null);
      // setPassword(null);
    }
    if (!Userid) nav("/login");
  };
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <nav className="header">
        <Link to="/">
          <img className="header_logo" src="/assets/logo.png" />
        </Link>
        <div className="dropdown">
          <span onClick={toggleDropdown} className="all-span">
            All
            <MdArrowDropDown />
          </span>
          {isOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-list-items">All Categoties</div>
              <div className="dropdown-list-items">Alexa Skills</div>
              <div className="dropdown-list-items">Amazon Devices</div>
              <div className="dropdown-list-items">Amazon Fashion</div>
              <div className="dropdown-list-items">Amazon Fresh</div>
              <div className="dropdown-list-items">Amazon Pharmacy</div>
              <div className="dropdown-list-items">Appliances</div>
              <div className="dropdown-list-items">Apps & games</div>
              <div className="dropdown-list-items">Baby</div>
              <div className="dropdown-list-items">Beauty</div>
              <div className="dropdown-list-items">Books</div>
              <div className="dropdown-list-items">Car & Motorbike</div>
              <div className="dropdown-list-items">Clothing & Accessories</div>
              <div className="dropdown-list-items">Deals</div>
              <div className="dropdown-list-items">Electronics</div>
              <div className="dropdown-list-items">Furniture</div>
              <div className="dropdown-list-items">Garden & Outdoors</div>
              <div className="dropdown-list-items">Gift Cards</div>
              <div className="dropdown-list-items">Grocery & Gourmet Foods</div>
              <div className="dropdown-list-items">Health & Personal Care</div>
              <div className="dropdown-list-items">Industrial & Scientific</div>
              <div className="dropdown-list-items">Jewellery</div>
              <div className="dropdown-list-items">Kindle Store</div>
              <div className="dropdown-list-items">Luggage & Bags</div>
              <div className="dropdown-list-items">Luxury Beauty</div>
              <div className="dropdown-list-items">Movies & TV Shows</div>
            </div>
          )}
        </div>
        <div className="header_search">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            className="header_searchInput"
          />
        </div>
        <div className="icon">
          <button className="search-button">
            <RiSearch2Line className="header_searchIcon" />
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
                <span className="lineone">Hello {UserName}</span>
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
              <span className="lineone linetwo gap">
                {state.cartItems.length}
              </span>
            </div>
          </Link>
        </div>
      </nav>
      <nav className="header-down">
        <span className="hover-text all">
          <GiHamburgerMenu />
          All
        </span>
        <span className="hover-text">Amazon MiniTV</span>
        <span className="hover-text sell">Sell</span>
        <span className="hover-text">Best Sellers</span>
        <span className="hover-text">Mobiles</span>
        <span className="hover-text">Today's Deal</span>
        <span className="hover-text">Customer Service</span>
        <span className="hover-text">Electronics</span>
        <span className="hover-text">
          Prime
          <MdArrowDropDown />
        </span>
        <span className="hover-text">New Releases</span>
        <span className="hover-text">Amazon Pay</span>
        <span className="hover-text">Home & Kitchen</span>
        <span className="hover-text">Fashion</span>
        <span className="hover-text">Computers</span>
      </nav>
    </>
  );
}

export default Header;
