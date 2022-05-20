import { combineReducers } from "redux";


import citizensReducer from "./citizens/citizens.reducer";
import agencyReducer from "./agencies/agencies.reducer";
import userReducer from "./user/user.reducer";
import familyReducer from "./families/families.reducer";

const appReducer = combineReducers({
    citizens: citizensReducer,
    agencies: agencyReducer,
    user: userReducer,
    families: familyReducer
});

// const rootReducer = () => {
//     return combineReducers({
//         citizens: citizensReducer,
//         agencies: agencyReducer,
//         user: userReducer,
//         families: familyReducer
//     });
// }
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      return appReducer(undefined, action)
    }
    return appReducer(state, action)
}
export default rootReducer;