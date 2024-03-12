
import { useEffect, useRef, useState } from 'react'
import '../../../Styles/HomePageSubFolders/QuestionComponent.css'
import { useDispatch, useSelector } from 'react-redux'

const QuestionComponent = (props)=>{

   const dispatch = useDispatch()
   const uiReducer = useSelector((state)=> state.ui.questionForm)

   const [selectedDay, setSelectedDay] = useState('1')
   const [selectedHour, setSelectedHour] = useState('0')
   const [selectedMinutes, setSelectedMinutes] = useState('0')
   const choices = uiReducer
   const questionRef = useRef()
   const disableAddButton = {
      display: choices.length >= 4 && 'none'
   }

   useEffect(()=>{
      for(let i=0; i<questionRef.current.childNodes.length;i++){
         let eachElAr = questionRef.current.childNodes[i]
         let inputEl = eachElAr.querySelector('input')
         let labelEl = eachElAr.querySelector('label')
         if(inputEl.value){
            labelEl.classList.add('qwe')
         }
      }
   },[])

   useEffect(()=>{
      const handleOutsideClick = (e)=>{
         let clickedEl = e.target
         for (let i = 0; i < questionRef.current.childNodes.length; i++){
            let el = questionRef.current.childNodes[i]
            if(el.contains(clickedEl)){
               el.childNodes[0].style.color = 'rgb(29, 155, 240)'
               el.childNodes[0].classList.remove('focusedQuestion_end')
               if (!el.childNodes[0].classList.contains('qwe')){
                  el.childNodes[0].classList.add('focusedQuestion')
                  console.log('evet içeriyor');
               }else{
                  console.log('burası');
               }
               el.classList.add('el_outline')
               el.childNodes[1].style.display = 'inline'
               el.childNodes[2].focus()
            }else{

               let inp = [...el.childNodes].find((el) => el.nodeName === 'INPUT')
               if(inp.value.length > 0 ){
                  el.classList.remove('el_outline')
                  el.childNodes[0].style.color = 'rgb(83, 100, 113)'
                  console.log('else kısmı if kısmı');
               }else{
                  if (el.childNodes[0].classList.contains('qwe')){
                     el.childNodes[0].classList.remove('qwe')
                     el.childNodes[0].classList.add('focusedQuestion_end')
                     console.log('else kısmı else kısmı if kısmı');
                  }
                  el.childNodes[0].style.color = 'rgb(83, 100, 113)'
                  el.childNodes[1].style.display = 'none'
                  el.classList.remove('el_outline')
                  if (el.childNodes[0].classList.contains('focusedQuestion')){
                     console.log('else kısmı else kısmı if kısmı if kısmı');
                     el.childNodes[0].classList.remove('focusedQuestion')
                     el.childNodes[0].classList.add('focusedQuestion_end')
                  }
               }

            }
         }

      }
      document.addEventListener('click',handleOutsideClick)
      return ()=>{
         document.removeEventListener('click',handleOutsideClick)
      }
   },[])

   const handleDay = (e)=>{
      setSelectedDay(e.target.value)
   }
   const handleHour = (e)=>{
      setSelectedHour(e.target.value)
   }
   const handleMinute = (e)=>{
      setSelectedMinutes(e.target.value)
   }
   const addChoiceHandler = (e)=>{
      dispatch({
         type:'QUESTION_FORM',
         payload: [
            ...choices,
            ''
         ]
      })
   }
   const closeQuestion = ()=>{
      props.closeQuestionContainer()
   }
   const inputChangeHandler = (e,idx)=>{
      choices[idx] = e.target.value
      dispatch({
         type: 'QUESTION_FORM',
         payload: choices
      })
   }

   return <form className="question_container">

      <div className='question_addbuton_container'>
         <div ref={questionRef}>
            {
               choices.map((el,idx)=>{
                  return <div className='single_question' key={idx}>
                     <label>Choice {idx < 2 ? `${idx}`:`${idx} (Optional)`}</label>
                     <span>0/25</span>
                     <input value={choices[idx]} onChange={(e)=>inputChangeHandler(e,idx)} type="text" />
                  </div>
               })
            }
         </div>

         <div style={disableAddButton} onClick={addChoiceHandler} className="addButton">
            <svg viewBox="0 0 24 24"><g><path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"></path></g></svg>
         </div>
      </div>

      <div className="question_bodySection">
         <label>Poll Length</label>
         <div className="poll_inp_container">

            <div className="eachinput_div">
               <div className='selectDiv_left'>
                  <label style={{fontSize:'12px',letterSpacing:'.5px'}}>Days</label>
                  <span style={{fontSize:'18px'}}>{selectedDay}</span>
               </div>

               <div className="selectDiv_right">
                  <select onChange={handleDay}>
                     <option value=""></option>
                     <option value="0">0</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                  </select>
                  <svg viewBox="0 0 24 24" ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
               </div>
            </div>

            <div className="eachinput_div">
               <div className='selectDiv_left'>
                  <label style={{ fontSize: '12px', letterSpacing: '.5px' }}>Hours</label>
                  <span style={{ fontSize: '18px' }}>{selectedHour}</span>
               </div>

               <div className="selectDiv_right">
                  <select onChange={handleHour}>
                     <option value=""></option>
                     <option value="0">0</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                     <option value="8">8</option>
                     <option value="9">9</option>
                     <option value="10">10</option>
                     <option value="11">11</option>
                     <option value="12">12</option>
                     <option value="13">13</option>
                     <option value="14">14</option>
                     <option value="15">15</option>
                     <option value="16">16</option>
                     <option value="17">17</option>
                     <option value="18">18</option>
                     <option value="19">19</option>
                     <option value="20">20</option>
                     <option value="21">21</option>
                     <option value="22">22</option>
                     <option value="23">23</option>
                  </select>
                  <svg viewBox="0 0 24 24" ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
               </div>
            </div>

            <div className="eachinput_div">
               <div className='selectDiv_left'>
                  <label style={{ fontSize: '12px', letterSpacing: '.5px' }}>Minutes</label>
                  <span style={{ fontSize: '18px' }}>{selectedMinutes}</span>
               </div>

               <div className="selectDiv_right">
                  <select onChange={handleMinute}>
                     <option value=""></option>
                     <option value="0">0</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                     <option value="8">8</option>
                     <option value="9">9</option>

                     <option value="10">10</option>
                     <option value="11">11</option>
                     <option value="12">12</option>
                     <option value="13">13</option>
                     <option value="14">14</option>
                     <option value="15">15</option>
                     <option value="16">16</option>
                     <option value="17">17</option>
                     <option value="18">18</option>
                     <option value="19">19</option>

                     <option value="20">20</option>
                     <option value="21">21</option>
                     <option value="22">22</option>
                     <option value="23">23</option>
                     <option value="24">24</option>
                     <option value="25">25</option>
                     <option value="26">26</option>
                     <option value="27">27</option>
                     <option value="28">28</option>
                     <option value="29">29</option>

                     <option value="30">30</option>
                     <option value="31">31</option>
                     <option value="32">32</option>
                     <option value="33">33</option>
                     <option value="34">34</option>
                     <option value="35">35</option>
                     <option value="36">36</option>
                     <option value="37">37</option>
                     <option value="38">38</option>
                     <option value="39">39</option>
                     
                     <option value="40">40</option>
                     <option value="41">41</option>
                     <option value="42">42</option>
                     <option value="43">43</option>
                     <option value="44">44</option>
                     <option value="45">45</option>
                     <option value="46">46</option>
                     <option value="47">47</option>
                     <option value="48">48</option>
                     <option value="49">49</option>

                     <option value="50">50</option>
                     <option value="51">51</option>
                     <option value="52">52</option>
                     <option value="53">53</option>
                     <option value="54">54</option>
                     <option value="55">55</option>
                     <option value="56">56</option>
                     <option value="57">57</option>
                     <option value="58">58</option>
                     <option value="59">59</option>

                  </select>
                  <svg viewBox="0 0 24 24" ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
               </div>
            </div>

         </div>
      </div>
      <div onClick={closeQuestion} className="question_bottomSection">
         <span>Remove poll</span>
      </div>
   </form>

}


export default QuestionComponent
