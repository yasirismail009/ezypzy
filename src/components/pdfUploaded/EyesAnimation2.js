import React from 'react';
import './style2.css'; // Make sure the correct path to your CSS file is used
import img1 from '../../assets/2-a.png'; // Make sure the correct path to your image files is used
// import img2 from '../../assets/2-a.png'; // Make sure the correct path to your image files is used

class SobaSysComponent extends React.Component {
  componentDidMount() {
    document.querySelector(".right2").addEventListener("mousemove", this.eyeball);
  }

  componentWillUnmount() {
    document.querySelector(".right2").removeEventListener("mousemove", this.eyeball);
  }

  eyeball = (event) => {
    const eyes = document.querySelectorAll(".eyes2");
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
    const myImage = document.querySelector(".image2");
    myImage.style.opacity = 1;
    setTimeout(() => {
      myImage.src = img1;
      myImage.style.opacity = 1;
    }, 100);
  };

  render() {
    return (
      <div className="section2">
        <div className="main2">
          <div className="left2" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}></div>
          <div className="right2"onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <div className="img2">
              <img className="image2" src={img1} alt="" />
              <div className="container2">
                <div className="eyes2"></div>
                <div className="eyes2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SobaSysComponent;
