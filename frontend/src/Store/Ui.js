

const ui_state = {
   questionForm: [
      '',
      ''
   ],
   inputField: []
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
      case 'UPDATE_DRAFT':
         return{
            ...state,
            inputField: [...action.payload]
         }
      default:
         return state;
   }
}

export default uiReducer

