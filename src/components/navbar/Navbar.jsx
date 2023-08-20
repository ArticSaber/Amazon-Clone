import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiSearch2Line } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../../redux/dataSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.data.cartItems);
  const { userId, userName } = useSelector((state) => state.data);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const nav = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      useCookies(["token"], { expires: new Date(0) });
      dispatch(logout());
      toast.success("Logout Successfully");
      nav("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

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

        <div className="headerNav">
          {userId ? (
            <div className="header_link">
              <div className="header_option" onClick={handleLogout}>
                <span className="lineone">Hello{userName}</span>
                <div className="linetwo">Logout</div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header_link">
              <div className="header_option">
                <span className="lineone">Hello</span>
                <div className="linetwo">Login</div>
              </div>
            </Link>
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
              <span className="lineone linetwo gap">{cartItems.length}</span>
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

export default Navbar;
