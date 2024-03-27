
import { useDispatch, useSelector } from 'react-redux'
import '../../../Styles/HomePageSubFolders/Draft.css'
import RichTextBox from './RichTextBox'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import BackDrop2 from '../../BackDrop2'



const Draft = (props)=>{
   let richTB = useSelector(state => state.ui.inputField)
   const dispatch = useDispatch()

   const [focusedEl, setFocusedEl] = useState(richTB.length-1)
   const [discard,setDiscard] = useState(false)
   const discardRef = useRef()
   const btnRef = useRef()
   const [inpFlag, setInpFlag] = useState(false)
   const [canPost, setCanPost] = useState(true)
   const draft_container = useRef()


   useEffect(()=>{
      window.scroll(0,0)
   })
   // useEffect(()=>{
   //    // .pause() --- .play()
   //    // let ar = [...draft_container.current.querySelectorAll('.homepage_content_body')]


   // },[focusedEl])

   const checkBounds = ()=>{
      let boundflag = true
      for (let i = 0; i < richTB.length; i++) {
         if(Array.from(richTB[i].text).length === 0 || Array.from(richTB[i].text).length > props.validTextLength){
            boundflag = false
         }
      }
      setCanPost(boundflag)
   }
   const closeDraftsHandler = ()=>{
      setDiscard(true)
   }
   const whichEl = (val)=>{
      setFocusedEl(val)
   }
   const clearImage = (wEl, wMediaIdx)=>{

      let newAr = [...richTB]
      let newinner = newAr[wEl].mediaContent.filter((el, idx) => idx !== wMediaIdx)
      newAr[wEl].mediaContent = newinner

      dispatch({
         type:'UPDATE_DRAFT',
         payload: [...newAr]
      })


   }
   const discardHandler = (e)=>{
      dispatch({
         type:'UPDATE_DRAFT',
         payload: []
      })
      props.closeDraftHandler()
   }
   const clickHandler = (e)=>{
      if(e.target === btnRef.current) return

      if(discard){
         if (!discardRef.current.contains(e.target)){
            setDiscard(false)
         }
      }
   }


   const addedNewField = (elidx, content, medias)=>{
      let newAr = [...richTB]

      newAr[elidx].mediaContent = [...medias]
      newAr[elidx].text = content

      let newEl = {text:'', mediaContent: []}
      newAr.splice(elidx+1, 0, newEl)

      newAr = newAr.filter((el,idx)=>{
         return el.text.length > 0 || idx === elidx+1
      })

      dispatch({
         type: 'UPDATE_DRAFT',
         payload: [...newAr]
      })

      if(elidx+1 === newAr.length) elidx-=1


      setFocusedEl(elidx+1)
      setInpFlag(true)
   }

   return <div onClick={clickHandler} className='draft_container' ref={draft_container}>
      <div className="draft_header">
         <div onClick={closeDraftsHandler} className='close_draft'>
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
         </div>
         <div className='go_drafts'><span>Drafts</span></div>
      </div>

      {
         richTB.map((el,idx)=>{
            return <RichTextBox
               key = {idx}
               clearInput={() => setInpFlag(false)}
               el = {el}
               inpFlag = {inpFlag}
               elidx = {idx}
               whichEl = {()=>whichEl(idx)}
               showEl = {idx === focusedEl ? true : false}
               addedNewField={(elidx, content, medias) => addedNewField(elidx = idx, content, medias)}
               clearImage = {clearImage}
               canPost = {canPost}
               wholeAr={richTB}
               checkBounds = {checkBounds}
            />
         })
      }
      {
         discard && createPortal(
            <>
               <BackDrop2 />
               <div ref={discardRef} onClick={clickHandler} className="discard_container">
                  <div className="discard">
                     <div style={{fontWeight:'700',fontSize:'20px',paddingBottom:'6px'}}>Discard thread?</div>
                     <span style={{color:'rgb(83, 100, 113)'}}>This can't be undone and you'll lose your draft</span>
                     <div className="discardBtnContainer">
                        <div ref={btnRef} onClick={discardHandler} className="discardBtn">Discard</div>
                        <div onClick={()=>setDiscard(false)} className="discardCancelBtn">Cancel</div>
                     </div>
                  </div>
               </div>
            </>,
            document.getElementById('layers')
         )
      }


   </div>
}


export default Draft
