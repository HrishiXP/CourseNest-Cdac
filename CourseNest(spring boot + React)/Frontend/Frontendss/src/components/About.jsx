import React from 'react';


import Footer from './Footer';
import '../AboutCSS.css'; // Ensure to import your CSS file

const About = () => {
  return (
    <div className="about-page-container"> {/* Updated className */}
      <div className='Row About_Row'>
       <div className='container'>
       <h1 className="mb-4 display-4 font-weight-bold text-center">CourseNest</h1>
        <p className="lead text-muted">
          We help students across the world upgrade their resources and bring them closer to their career goals. CourseNest offers the best courses that make you industry-ready.
        </p>
       </div>
      </div>
  
      <div className='Row AboutUs_photo_section1'>
        <div className='Row Photo_display'>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src="assets/img/somesh.jpeg"alt="" />
              <p className='Photo_Name'>Somesh Dawalbaje</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src="assets/img/akash.jpeg" alt="" />
              <p className='Photo_Name'>Akash Kalpande</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src="assets/img/arif.jpeg" alt="" />
              <p className='Photo_Name'>Aref Shaikh</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src="assets/img/hrs.jpeg" alt="" />
              <p className='Photo_Name'>Hrishikesh Sapkal</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src="assets/img/uady.jpeg" alt="" />
              <p className='Photo_Name'>Uday Narsale</p>
            </div>
          </div>
        </div>
      </div>

    
      <br />

    
      <br />

      <Footer />
    </div>
  );
}

export default About;