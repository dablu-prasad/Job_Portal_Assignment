import React from 'react'
import "../HomePage/HomePage.css"
import "../../Styles/CommonCss.css"
import Footers from '../Footers/Footers'
import Headers from '../Headers/Headers'
import MainPage from '../MainPage/MainPage'
const HomePage = () => {
  return (
    <body>
      <div className='container'>
          <Headers/>
          <MainPage/>
          <Footers/>
      </div>
    </body>
  )
}

export default HomePage
