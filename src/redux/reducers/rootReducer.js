import { combineReducers } from "redux";

import citizenReducer from "./citizens/citizens.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = () => {
    return combineReducers({
        citizens: citizenReducer,
        user: userReducer
    });
}
export default rootReducer;