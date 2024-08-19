import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
       
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">E-Learning</h5>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Software Development
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                DevOps
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Testing
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Gift Card
              </a>
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Useful Links</h5>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Blog
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Career
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Site Map
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Corporate Info
              </a>
            </p>
          </div>

          {/* Column 3: Customer Policy */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Customer Policy</h5>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Contact Us
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                FAQ
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Terms & Conditions
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Terms of Use
              </a>
            </p>
          </div>

          {/* Column 4: Social Media */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaFacebookF />
              </a>
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaTwitter />
              </a>
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaInstagram />
              </a>
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Footer Bottom */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left mb-0">
              © {new Date().getFullYear()} CourseNest. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
