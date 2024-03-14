import '../../Styles/UserRoutesCss/HomePage.css'
import { useNavigate } from 'react-router-dom'
import MainRichTextBox from './HomePageSubFolders/MainRichTextBox'
import Header from './HomePageSubFolders/Headers'
import Rightbar from './RightBar'

import { useState } from 'react'


const HomePage = () => {

   const navigate = useNavigate()

   const isLogged = async () => {
      let response = await fetch('http://localhost:4000/api/v1/islogged', {
         method: 'GET',
         credentials: 'include'
      })
      if (response.status !== 200) {
         navigate('/login')
         return
      }
   }



   return <div className='homepage_container_main' >

         <div className='body_container'>
            <Header />

            <MainRichTextBox />

         </div>

         <Rightbar />

      </div>

}

export default HomePage