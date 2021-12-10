import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const configureStore = () => {

    const persistConfig = {
        key: "root",
        storage: storage,
        whitelist: ['user'],
        stateReconciler: autoMergeLevel2
    }

    const pReducer = persistReducer(persistConfig, rootReducer());

    const middlewares = [thunk];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(applyMiddleware(...middlewares));
    const store = createStore(pReducer, enhancers);
    return store;
}

export default configureStore;