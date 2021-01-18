import {Reducer} from './reducers/index'
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";

export const store = createStore(Reducer, applyMiddleware(thunk));

export * from './action-creators';
export * from './action-types';
export * from './reducers';
//
// export class searchFilmAction {
// }