import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from '../type';

const initialState = {
    cartItems: [],
    loading: true,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART: {
            const payload = action.payload;
            const items = Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload)
                    ? payload
                    : [];

            return {
                ...state,
                cartItems: items,
                loading: false,
            };
        }
        case ADD_TO_CART: {
            const payload = action.payload;
            const items = Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload)
                    ? payload
                    : state.cartItems;

            return {
                ...state,
                cartItems: items,
            };
        }
        case REMOVE_FROM_CART: {
            const removedId = action.payload?.data?._id || action.payload?._id;
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== removedId),
            };
        }
        case UPDATE_CART: {
            const updatedItem = action.payload?.data || action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === updatedItem?._id ? updatedItem : item
                ),
            };
        }
        default:
            return state;
    }
};

export default cartReducer;