import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from '../type';

const initialState = {
    cartItems: [],
    loading: true,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cartItems: action.payload?.data || [],
                loading: false,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: action.payload?.data || state.cartItems,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload?.data?._id),
            };
        case UPDATE_CART:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === action.payload?.data?._id ? action.payload.data : item
                ),
            };
        default:
            return state;
    }
};

export default cartReducer;