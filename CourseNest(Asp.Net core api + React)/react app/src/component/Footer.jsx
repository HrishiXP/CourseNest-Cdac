import React from "react";
import styles from "./footer.module.css";
import { SocialIcon } from 'react-social-icons'

export const Footer = () => {
  return (
    <footer className={styles.foot}>
      <div className={styles.container}>
        <ul className={styles.ul_list}>
          <li className={styles.txt}>
            <p className={styles.heading}> SERVICES</p>

            <a href="#">Show Result</a>
            <a href="#">Attendance</a>
            <a href="#">Exam Calendar</a>
          </li>
          <li className={styles.txt}>
            <a className={styles.heading} href="#">
              CONTACT US
            </a>

            <a href="#">1800-266-0123</a>
            <a href="#">customercare@camu.co.in</a>
            <a href="#">FAQ</a>
          </li>
          <li className={styles.txt}>
            <a className={styles.heading} href="#">
              POLICIES
            </a>

            <a href="#">Admission</a>
            <a href="#">Cancellation</a>
            {/* <a href="#"></a>
            <a href="#">Delivery Information</a> */}
          </li>
          <li className={styles.txt}>
            <a className={styles.heading} href="#">
              ABOUT CAMU
            </a>

            <a href="#">Corporate</a>
            <a href="#">Careers</a>
          </li>
        </ul>
        {/* social */}
        <div className={styles.social}>
          {/* <div>
            <h3>DOWNLOAD WORLD OF TITAN APP</h3>
          </div> */}
          {/* <div className={styles.store}>
            <div className={styles.apple}>
              <a href="#">
                <img width={129} height={39} src="./assets/images/apple.webp" />
              </a>
            </div>
            <div className={styles.play}>
              <a href="#">
                <img
                  width={129}
                  height={38}
                  src="./assets/images/google-play-badge.webp"
                />
              </a>
            </div>
          </div> */}

          <div className={styles.us}>
            <div>
              <h4>FOLLOW US WITH</h4>

              <div>
                <ul className={styles.akb}>
                  <li>
                    <a href="#" title="instagram">
                    <SocialIcon url="https://instagram.com" />
                    </a>
                  </li>

                  <li>
                    <a href="#" title="facebook">
                    <SocialIcon url="https://facebook.com" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Twitter">
                    <SocialIcon url="https://twitter.com" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="linkedin">
                    <SocialIcon url="https://linkedin.com" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.planetx}>
            <p>
              Want Help?
              <a href="#">
                <strong> click here </strong>
              </a>
              to chat with us on
              <a> <SocialIcon id={styles.whatp} url="https://whatsapp.com" /></a>
             
            </p>
            <p className={styles.op}>
              Operating Hours: 10:00AM to 10:00PM Monday to Sunday
            </p>
          </div>
        </div>
      </div>
      <div className={styles.copy}>© 2024 Camu Company Limited. All Rights Reserved.</div>


      {/* bottom container */}

      {/* <div className={styles.bottom_container}>
        <div className={styles.h}>
          <div className={styles.text}></div>
          <div className={styles.cond}>
            <a href="#">TERMS & CONDITIONS</a>
          </div>
          <div className={styles.cond}>
            <a href="#">PRIVACY POLICY</a>
          </div>
          <div className={styles.cond}>
            <a href="#">WEARABLES PRIVACY POLICY</a>
          </div>
        </div>
        <div className={styles.copy}>© 2022 Titan Company Limited. All Rights Reserved.</div>

      </div> */}
    </footer>
  );
};
