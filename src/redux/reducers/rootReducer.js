import { combineReducers } from "redux";

import citizensReducer from "./citizens/citizens.reducer";
import userReducer from "./user/user.reducer";
import familyReducer from "./families/families.reducer";

const rootReducer = () => {
    return combineReducers({
        citizens: citizensReducer,
        user: userReducer,
        families: familyReducer
    });
}
export default rootReducer;