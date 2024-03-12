

import { combineReducers } from "redux";
import userReducer from './UserStore.js';
import authReducer from "./AuthStore.js";
import uiReducer from "./Ui.js";



const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   ui: uiReducer
})

export default rootReducer




