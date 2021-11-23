import { combineReducers } from "redux";

import citizenReducer from "./citizens/citizens.reducer";

const rootReducer = () => {
    return combineReducers({
        citizens: citizenReducer
    })
}
export default rootReducer;