import { combineReducers } from "redux";

import citizenReducer from "./citizens/citizens.reducer";
import agencyReducer from "./agencies/agencies.reducer";
import userReducer from "./user/user.reducer";
import familyReducer from "./families/families.reducer";

const rootReducer = () => {
    return combineReducers({
        citizens: citizenReducer,
        agencies: agencyReducer,
        user: userReducer,
        families: familyReducer,
    });
}
export default rootReducer;