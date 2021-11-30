import {createStore, applyMiddelwere} from 'redux';
import {composewithDevtools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';   


export const store = createStore(rootReducer, composewithDevtools(applyMiddelwere(thunk)))