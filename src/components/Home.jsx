import React,{useEffect} from "react";
import "./Home.css";
import Products from "./products";

function Home() {
    function Slider(Counter) {
    const Slides = document.querySelectorAll(".homeimg")
    Slides.forEach((slide, index) => {
      if (index !== Counter) {
        slide.style.visibility = `hidden`;
        slide.classList.add(`image-${index}`);
      }
    })
    moveCarousal(Counter, Slides, Slides.length);
  }
  function moveCarousal(Counter, Slides, len) {
    if (Slides) {
      if (Counter >= len - 1) Counter = 0;
      else Counter += 1;
      Slides.forEach((slide, index) => {
        if (index == Counter) {
          slide.style.visibility = `visible`;
        }
        else {
          slide.style.visibility = `hidden`;
        }
      });
    }
    setTimeout(() => {
      moveCarousal(Counter, Slides, len);
    }, 4000);
  }
  
    useEffect(() =>Slider(0),[] )
  
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
        <Products
          id="123321123"
          category=""
          title="hello im an your product"
          price={20000}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
          rating={2}
        />
        <Products
          id="456754567"
          category=""
          title="hello im your second product "
          price={5000}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
          rating={3}
        />
        <Products
          id="123321123"
          category=""
          title="hello im  your third produc"
          price={2900}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
          rating={5}
        />
      </div>
      <div className="home-row">
        <Products />
        <Products />
      </div>
      <div className="home-row">
        <Products />
      </div>
    </div>
  );
}

export default Home;
