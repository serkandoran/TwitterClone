

const ui_state = {
   questionForm: [
      '',
      ''
   ],
   inputField: [
   ],
   temp: [

   ]
}

const uiReducer = (state = ui_state, action) => {
   switch (action.type) {
      case 'QUESTION_FORM':
         return {
            ...state,
            questionForm: [
               ...action.payload
            ]
         }
      case 'INPUT_FIELD':
         return{
            ...state,
            inputField: [
               ...action.payload
            ]
         }
      case 'CLEAR_INPUT':
         return{
            ...state,
            inputField: []
         }
      default:
         return state;
   }
}

export default uiReducer

