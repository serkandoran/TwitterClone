

import { combineReducers } from "redux";
import userReducer from './UserStore.js';
import authReducer from "./AuthStore.js";



const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
})

export default rootReducer




