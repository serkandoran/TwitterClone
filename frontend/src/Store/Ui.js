

const ui_state = {
   questionForm: [
      '',
      ''
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
      default:
         return state;
   }
}

export default uiReducer

