import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from '../type';

const initialState = {
    cartItems: [],
    loading: true,
};

// كل الأكشنات ترسل مصفوفة عناصر السلة كاملة في payload
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
        case ADD_TO_CART:
        case REMOVE_FROM_CART:
        case UPDATE_CART:
            return {
                ...state,
                cartItems: Array.isArray(action.payload) ? action.payload : [],
                loading: false,
            };
        default:
            return state;
    }
};

export default cartReducer;
