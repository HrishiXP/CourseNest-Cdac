import React from 'react'
import images1 from "./images/img-3.jpg"

const BannerSection = () => {
  return (
    <>
    <div className='Banner_section'>
        BannerSection
    <img className='image1' src={images1} alt=""/>
    <div className='Banner_section_text'>
        <h1>Old Clothes, New Answers.</h1>
        <p className='para_Banner_section'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut <br/> enim ad minim veniam, quis nostrud exercitation ullamco 

        laboris nisi ut aliquip ex ea  eiusmod tempor
            
         incididuntut labore et dolore magna aliqua. Ut <br/> enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
    </div>
    </div>

    </>
  
  )
}

export default BannerSection