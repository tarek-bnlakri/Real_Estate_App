import React from 'react'
import './HomePage.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
function HomePage() {
  return (
    <div className='homePage'>
        <div className="textContainer">
            <div className="wrapper">

            <h1>Find Real Estate & Get Your Dream Place
            </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum itaque aspernatur molestias commodi animi est, quia similique reprehenderit, illum asperiores molestiae quo ea minima quibusdam at cumque, maxime mollitia et?
            </p>
            <SearchBar/>
            <div className="Boxes">
                <div className="box">
                    <h1>16+</h1>
                    <h2>Years of Exerience</h2>
                </div>
                <div className="box">
                    <h1>200</h1>
                    <h2>Award Gained</h2>
                </div>
               
                <div className="box">
                    <h1>2000+</h1>
                    <h2>Property Ready</h2>
                </div>
               
            </div>
            </div>
        </div>
        <div className="imgContainer"><img src='/bg.png'/></div>
    </div>
  )
}

export default HomePage