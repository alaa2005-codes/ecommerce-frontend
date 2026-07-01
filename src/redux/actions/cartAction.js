import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInsertData';
import useDeleteData from '../../hooks/useDeleteData';
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, GET_ERROR } from '../type';

// Get cart items
export const getCartItems = () => async (dispatch) => {
    try {
        const response = await useGetDataToken('/cart');
        dispatch({
            type: GET_CART,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        });
    }
};

// Add to cart
export const addToCart = (productId, quantity) => async (dispatch) => {
    try {
        const response = await useInsertData('/cart', { productId, quantity });
        dispatch({
            type: ADD_TO_CART,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        });
    }
};

// Remove from cart
export const removeFromCart = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/cart/${id}`);
        dispatch({
            type: REMOVE_FROM_CART,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        });
    }
};

// Update cart quantity
export const updateCart = (id, quantity) => async (dispatch) => {
    try {
        const response = await useInsertData(`/cart/${id}`, { quantity });
        dispatch({
            type: UPDATE_CART,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        });
    }
};