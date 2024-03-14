
import '../../../Styles/HomePageSubFolders/Draft.css'
import RichTextBox from './RichTextBox'



const Draft = ()=>{



   return <div className='draft_container'>

      <div className="draft_header">
         <div className='close_draft'>
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
         </div>
         <div className='go_drafts'><span>Drafts</span></div>
      </div>

      <RichTextBox />

   </div>
}


export default Draft

