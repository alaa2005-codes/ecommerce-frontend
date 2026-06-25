import { CREATE_SUB_CATEGORY, GET_SUB_CATEGORY, GET_ERROR } from '../type'
import { useGetData } from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData'

//create sub category with pagination
export const createSubCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData("/subcategories", data);
        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get sub category depend in cat id
export const getOneCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/categories/${id}/subcategories`);
        dispatch({
            type: GET_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}