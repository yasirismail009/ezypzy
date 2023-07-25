import React from 'react';
import './style.css'; // Make sure the correct path to your CSS file is used
import img1 from '../../assets/1-a.png'; // Make sure the correct path to your image files is used
import img2 from '../../assets/2-a.png'; // Make sure the correct path to your image files is used

class SobaSysComponent extends React.Component {
  componentDidMount() {
    document.querySelector(".right").addEventListener("mousemove", this.eyeball);
  }

  componentWillUnmount() {
    document.querySelector(".right").removeEventListener("mousemove", this.eyeball);
  }

  eyeball = (event) => {
    const eyes = document.querySelectorAll(".eyes");
    eyes.forEach((eye) => {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rotate = radian * (180 / Math.PI) * -1 + 90;
      eye.style.transform = `rotate(${rotate}deg)`;
    });
  };
// 
//   handleMouseEnter = () => {
//     const myImage = document.querySelector(".image");
//     myImage.style.opacity = 1;
//     setTimeout(() => {
//       myImage.src = img2;
//       myImage.style.opacity = 1;
//       myImage.style.margin = "-8px";
//     }, 100);
//   };

  handleMouseLeave = () => {
    const myImage = document.querySelector(".image");
    myImage.style.opacity = 1;
    setTimeout(() => {
      myImage.src = img1;
      myImage.style.opacity = 1;
    }, 100);
  };

  render() {
    return (
      <div className="section">
        <div className="main">
          <div className="left" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}></div>
          <div className="right"onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <div className="img">
              <img className="image" src={img1} alt="" />
              <div className="container">
                <div className="eyes"></div>
                <div className="eyes"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SobaSysComponent;
