import { START_LOADING, END_LOADING, RESULT, ERROR, OPEN, PING } from '../constants/constants';
import * as api from '../api/index.js';

export const predictImage = (formData) => async (dispatch) => {
    dispatch({type: START_LOADING});
    try {
        const data = await api.predict_image(formData);
        console.log("final =====================",data.data.final)
        const final = data.data.final;
        dispatch({ type: RESULT, final });

        dispatch({ type: OPEN });

    } catch (error) {
        dispatch({ type: ERROR, error });
    }
    dispatch({type: END_LOADING});
}

export const predictFile = (formData) => async (dispatch) => {
    dispatch({type: START_LOADING});
    try {
        const data = await api.predict_file(formData);
        console.log("final =====================",data.data.final)
        const final = data.data.final;
        dispatch({ type: RESULT, final });

        dispatch({ type: OPEN });

    } catch (error) {
        dispatch({ type: ERROR, error });
    }
    dispatch({type: END_LOADING});
}

export const pingServer = () => async (dispatch) => {
    try{
        const { data: { data } } = await api.ping_server();
        dispatch({ type: PING, data: data})
    } catch (error) {
        console.log(error);
    }
}