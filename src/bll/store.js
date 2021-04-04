import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {blogReducer} from "./blogReducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
      posts: blogReducer
})


// redux dev-tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
