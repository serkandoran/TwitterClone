
import { useDispatch, useSelector } from 'react-redux'
import '../../../Styles/HomePageSubFolders/Draft.css'
import RichTextBox from './RichTextBox'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import BackDrop2 from '../../BackDrop2'



const Draft = (props)=>{
   const richTB = useSelector(state => state.ui.inputField)
   const dispatch = useDispatch()

   const [focusedEl, setFocusedEl] = useState(richTB.length-1)
   const [discard,setDiscard] = useState(false)
   const discardRef = useRef()
   const btnRef = useRef()
   const [inpFlag, setInpFlag] = useState(false)
   const [canPost, setCanPost] = useState(true)


   const closeDraftsHandler = ()=>{
      setDiscard(true)
   }
   const whichEl = (val)=>{
      setFocusedEl(val)
   }
   const discardHandler = (e)=>{
      dispatch({
         type:'CLEAR_INPUT',
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

   useEffect(()=>{
      setCanPost(true)
      for(let i=0; i<richTB.length; i++){
         if(Array.from(richTB[i]).length === 0 || Array.from(richTB[i]).length > props.validTextLength){
            setCanPost(false)
         }
      }
   })

   const addedNewField = (elidx, content)=>{
      let newAr = [...richTB]
      newAr[elidx] = content
      let emptyElementIdx
      for(let i=0; i<newAr.length;i++){
         if(newAr[i].length === 0){
            emptyElementIdx = i
         }
      }
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor
      // hafif tıklayınca focus oluyo ama opacity değişmiyor


      if(emptyElementIdx){
         newAr = [...newAr.slice(0,emptyElementIdx),...newAr.slice(emptyElementIdx+1)] // silme
         newAr = [...newAr.slice(0,elidx+1),'',...newAr.slice(elidx+1)] // ekleme
      }else{
         newAr = [...newAr.slice(0,elidx+1),'',...newAr.slice(elidx+1)]
      }

      let emptyElCount = 0
      let firstEmpty = []
      for(let i=0; i<newAr.length;i++){
         if(newAr[i].length === 0){
            firstEmpty.push(i)
            emptyElCount+=1
         }
      }
      if(emptyElCount > 1){
         firstEmpty = Math.min(parseInt(firstEmpty.join(' ')))
         newAr = [
            ...newAr.slice(0, firstEmpty+1),
            ...newAr.slice(firstEmpty+1).filter((el)=> el.length !== 0)
         ]
      }

      if(elidx+1 >= newAr.length){
         newAr = [...newAr.filter((el)=>el.length > 0),'']
         elidx = newAr.length-2
      }

      dispatch({
         type: 'INPUT_FIELD',
         payload: [...newAr]
      })
      setFocusedEl(elidx+1)
      setInpFlag(true)
   }


   return <div onClick={clickHandler} className='draft_container'>

      <div className="draft_header">
         <div onClick={closeDraftsHandler} className='close_draft'>
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
         </div>
         <div className='go_drafts'><span>Drafts</span></div>
      </div>

      {
         richTB.map((el,idx)=>{
            return <RichTextBox
                     clearInput = {()=>setInpFlag(false)}
                     inpFlag = {inpFlag}
                     elContent = {richTB[idx]}
                     elidx={idx}
                     whichEl={()=>whichEl(idx)}
                     key={idx}
                     showEl={idx == focusedEl ? true : false}
                     addedNewField={(elidx,content)=> addedNewField(elidx=idx,content)}
                     canPost = {canPost}
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

