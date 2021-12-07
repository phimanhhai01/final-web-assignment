import { combineReducers } from "redux";

import citizenReducer from "./citizens/citizens.reducer";
import userReducer from "./user/user.reducer";
import familyReducer from "./families/families.reducer";

const rootReducer = () => {
    return combineReducers({
        citizens: citizenReducer,
        user: userReducer,
        families: familyReducer,
    });
}
export default rootReducer;