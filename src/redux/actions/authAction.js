import { CREATE_NEW_USER, RESET_PASSWORD, VERIFY_PASSWORD, FOREGT_PASSWORD, GET_CURERNT_USER, LOGIN_USER } from '../type';
import { useInsertData } from '../../hooks/useInsertData';
import { useGetData, useGetDataToken } from './../../hooks/useGetData';
import { useInsUpdateData } from '../../hooks/useUpdateData';
import baseUrl from '../../Api/baseURL'; // 🔴 أضف هذا السطر

// create new user 
export const createNewUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/signup`, data);
        dispatch({
            type: CREATE_NEW_USER,
            payload: response,
            loading: true
        });
    } catch (e) {
        dispatch({
            type: CREATE_NEW_USER,
            payload: e.response,
        });
    }
};

// login user - 🔴 تم التعديل
export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/login`, data);
        dispatch({
            type: LOGIN_USER,
            payload: response,
            loading: true
        });
    } catch (e) {
        dispatch({
            type: LOGIN_USER,
            payload: e.response,
        });
    }
};

// get logged user
export const getLoggedUser = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/users/getMe`);
        dispatch({
            type: GET_CURERNT_USER,
            payload: response,
            loading: true
        });
    } catch (e) {
        dispatch({
            type: GET_CURERNT_USER,
            payload: e.response,
        });
    }
};

// forget password
export const forgetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data);
        dispatch({
            type: FOREGT_PASSWORD,
            payload: response,
            loading: true
        });
    } catch (e) {
        dispatch({
            type: FOREGT_PASSWORD,
            payload: e.response,
        });
    }
};

// verify password
export const verifyPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);
        dispatch({
            type: VERIFY_PASSWORD,
            payload: response,
            loading: true
        });
    } catch (e) {
        dispatch({
            type: VERIFY_PASSWORD,
            payload: e.response,
        });
    }
};

// reset password
export const resetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/auth/resetPassword`, data);
        dispatch({
            type: RESET_PASSWORD,
            payload: response,
            loading: true
        });
    } catch (e) {
        dispatch({
            type: RESET_PASSWORD,
            payload: e.response,
        });
    }
};