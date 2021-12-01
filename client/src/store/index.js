// import {createStore} from 'redux'
// import {applyMiddelwere} from 'redux'
// import {composewithDevtools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk'
// import rootReducer from '../reducer/index'  



// export const store = createStore(
//     rootReducer, 
//     composewithDevtools(applyMiddelwere(thunk))
// );



//-------------------------------------------------------------------------------------------

// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "../reducer/index";
// import thunk from "redux-thunk";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// export default store;
//---------------------------------------------------------------------------------------------

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

export const store = createStore(
    rootReducer,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(
            applyMiddleware(thunk),
        )
    )
)
//-------------------------------------------------------------------------------------------------
// import { createStore} from 'redux';

// const store = createStore({
//   reducer: {}
// })

// export default store;