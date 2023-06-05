import React, { useEffect } from "react";
import Products from "./products";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  function Slider(Counter) {
    const Slides = document.querySelectorAll(".homeimg");
    Slides.forEach((slide, index) => {
      if (index !== Counter) {
        slide.style.visibility = `hidden`;
        slide.classList.add(`image-${index}`);
      }
    });
    moveCarousal(Counter, Slides, Slides.length);
  }
  function moveCarousal(Counter, Slides, len) {
    if (Slides) {
      if (Counter >= len - 1) Counter = 0;
      else Counter += 1;
      Slides.forEach((slide, index) => {
        if (index == Counter) {
          slide.style.visibility = `visible`;
        } else {
          slide.style.visibility = `hidden`;
        }
      });
    }
    setTimeout(() => {
      moveCarousal(Counter, Slides, len);
    }, 4000);
  }

  useEffect(() => Slider(0), []);


  return (
    <div className="home">
      <div className="homeContainer">
        <div className="homeSliderContainer">
          <div className="homeSlide">
            <img className="homeimg" src="/assets/banner/bannerImgOne.jpg" />
          </div>
          <div className="homeSlide">
            <img className="homeimg" src="/assets/banner/bannerImgTwo.jpg" />
          </div>
          <div className="homeSlide">
            <img className="homeimg" src="/assets/banner/bannerImgThree.jpg" />
          </div>
          <div className="homeSlide">
            <img className="homeimg" src="/assets/banner/bannerImgFour.jpg" />
          </div>
          <div className="homeSlide">
            <img className="homeimg" src="/assets/banner/bannerImgFive.jpg" />
          </div>
        </div>
      </div>
      <div className="home-row">
        <Products />
      </div>
      <div className="footer">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="back-to-top" >
            Back To Top
          </div>
        </Link>
        <div className="footer-first-box">
          <div className="col1">
            <span className="header-span">Get to Know about us</span>
            <span className="footer-span">About Us</span>
            <span className="footer-span">Careers</span>
            <span className="footer-span">Press Release</span>
            <span className="footer-span">Amazon Science</span>
          </div>
          <div className="col1">
            <span className="header-span">Connect with us</span>
            <span className="footer-span">Facebook</span>
            <span className="footer-span">Twitter</span>
            <span className="footer-span">Instagram</span>
          </div>
          <div className="col1">
            <span className="header-span">Make Money with us</span>
            <span className="footer-span">Sell on Amazon</span>
            <span className="footer-span">Sell under Amazon Accelerator</span>
            <span className="footer-span">Protect and Build Your Brand</span>
            <span className="footer-span">Amazon Global Selling</span>
            <span className="footer-span">Become an Affiliate</span>
            <span className="footer-span">Fulfilment by Amazon</span>
            <span className="footer-span">Advertise Your Products</span>
            <span className="footer-span">Amazon Pay on Merchants</span>
          </div>
          <div className="col1">
            <span className="header-span">Let Us Help You</span>
            <span className="footer-span">COVID-19 and Amazon</span>
            <span className="footer-span">Your Account</span>
            <span className="footer-span">Returns Centre</span>
            <span className="footer-span">100% Purchase Protection</span>
            <span className="footer-span">Amazon App Download</span>
            <span className="footer-span">Help</span>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="footer-second-box">
          <Link to="/">
            <img className="header_logo" src="/assets/logo.png" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
