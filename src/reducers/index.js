import { combineReducers } from 'redux';

import modalReducer from './modal';
import imageReducer from './image'
export const reducers = combineReducers({ modalReducer, imageReducer });