import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInsertData';
import useDeleteData from '../../hooks/useDeleteData';
import { GET_ALL_USERS, CREATE_USER, DELETE_USER, ADD_ADDRESS, GET_ERROR } from '../type';

export const getAllUsers = (limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/users?limit=${limit}`);
        dispatch({
            type: GET_ALL_USERS,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const createUser = (formData) => async (dispatch) => {
    try {
        const response = await useInsertData(`/users`, formData);
        dispatch({
            type: CREATE_USER,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_USER,
            payload: e.response,
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/users/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: DELETE_USER,
            payload: e.response,
        })
    }
}

// أضف هذي الدالة
export const addAddress = (data) => async (dispatch) => {
    try {
        const response = await useInsertData('/addresses', data);
        dispatch({
            type: ADD_ADDRESS,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        });
    }
};