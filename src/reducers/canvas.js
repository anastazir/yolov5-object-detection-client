import * as actionTypes from "../constants/constants"

const canvasReducer = (state = {loading: false, result : null, error : null, openCanvas : false, connectedToServer: false}, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING:
            return { ...state, loading: true}            
        case actionTypes.END_LOADING:
            return { ...state, loading: false}
        case actionTypes.RESULT:
            console.log("==========================result", action.final)
            return { ...state, result: action.final}
        case actionTypes.ERROR:
            console.log("==========================error", action.error)
            return { ...state, error: action.error}
        case actionTypes.OPEN:{
            return { ...state, openCanvas : true}
        }
        case actionTypes.CLOSE:{
            return { ...state, openCanvas : false}
        }
        case actionTypes.PING:{
            return { ...state, connectedToServer: action.data}
        }
        default:
            return state
    }
}

export default canvasReducer