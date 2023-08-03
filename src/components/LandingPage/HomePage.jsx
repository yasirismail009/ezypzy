import React, { useState } from 'react'
import styles from './Homepage.module.css'
import Homepage from '../../assets/ExploreMode.gif'
import { Link } from 'react-router-dom';

export default function HomePage() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
      // Add your logic for onMouseEnter here
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      // Add your logic for onMouseLeave here
    };
  return (
    <div className={styles.main_div}>
        <div className={styles.flexData}>
            <div className={styles.blockDisplay}>
              <div className={styles.subBlock}>
            <p className={styles.subHeading}>Greetings, my name is</p>
            <img src={Homepage} className={styles.home_image}/>
            </div>
         <h1 className={styles.mainHeading}>Mr.EzPz</h1>
         </div>
         <p className={styles.paragraph}>I’m here to make learning easy peasy for you.</p>
         <Link to="/uploadFile">
         <button className={styles.btn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{isHovered?<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 44" fill="none">
<path d="M25.1037 39.799C35.2607 39.799 42.5157 33.5804 46.8687 27.3618C47.2833 26.5326 48.3197 26.3254 49.1489 26.9472C49.978 27.3618 50.1853 28.3982 49.5634 29.2274C45.0031 35.8605 36.7117 43.1155 24.8964 43.1155C13.2883 43.1155 4.99689 35.8605 0.436589 29.2274C-0.18527 28.3982 0.022016 27.3618 0.851161 26.9472C1.68031 26.3254 2.71674 26.5326 3.13131 27.3618C7.48432 33.5804 14.7393 39.799 24.8964 39.799H25.1037ZM11.8373 3.31658C11.8373 5.18216 10.3863 6.63316 8.52075 6.63316C6.65518 6.63316 5.20417 5.18216 5.20417 3.31658C5.20417 1.65829 6.65518 0 8.52075 0C10.3863 0 11.8373 1.65829 11.8373 3.31658ZM38.37 3.31658C38.37 1.65829 39.821 0 41.6866 0C43.5521 0 45.0031 1.65829 45.0031 3.31658C45.0031 5.18216 43.5521 6.63316 41.6866 6.63316C39.821 6.63316 38.37 5.18216 38.37 3.31658Z" fill="white"/>
</svg> :"Meet Me"}</button>
</Link>
        </div>
    </div>
  )
}
