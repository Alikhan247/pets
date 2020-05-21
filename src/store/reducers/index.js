import {combineReducers} from "redux";
import authReducer from "./authReducer";
import petReducer from "./petReducer";
import profileReducer from "./profileReducer";


export default combineReducers({
    auth: authReducer,
    pets: petReducer,
    profile: profileReducer
})