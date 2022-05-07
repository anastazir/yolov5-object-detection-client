import { combineReducers } from 'redux';

import imageReducer from './image'
import canvasReducer from './canvas';

export const reducers = combineReducers({ imageReducer, canvasReducer });