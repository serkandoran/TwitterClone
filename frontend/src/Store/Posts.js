



const initial_state = {
   post_ar:[
      {
         id:123123123,
         description: 'post description',
         type: 'foto, video, gif, question, draft',
         postData: 'eğer video, gif gibi bir şeyse datası',
         replyCount: 154,
         repostCount: 2.3,
         likeCount: 44,
         viewCount: 742,
      }
   ]
}


const PostReducer = (state = initial_state, action)=>{

   switch(action.payload){
      case 'ADD_POST':
         return {
            post_ar:[
               ...state.post_ar,
               action.payload // send object
            ]
         }
      default:
         return state
   }

}

export default PostReducer

