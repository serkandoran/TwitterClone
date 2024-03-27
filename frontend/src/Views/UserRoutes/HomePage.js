import '../../Styles/UserRoutesCss/HomePage.css'
import { useFetcher, useNavigate } from 'react-router-dom'
import MainRichTextBox from './HomePageSubFolders/MainRichTextBox'
import Header from './HomePageSubFolders/Headers'
import Rightbar from './RightBar'
import Flow from './HomePageSubFolders/Flow'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

/*
useEffect(()=>{
   setTimeout(() => {
      isLogged() // buraya bekleme efekti koy
   }, 1500);
},[])

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
*/

const HomePage = () => {
   const navigate = useNavigate()

   const postAr = useSelector(state => state.posts)
   console.log(postAr);








   return <div className='homepage_container_main' >

         <div className='body_container'>
            <Header />

            <MainRichTextBox />

            <Flow />

         </div>

         <Rightbar />

      </div>

}

export default HomePage