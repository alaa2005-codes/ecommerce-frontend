import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from '../type';
import { getCurrentUser } from '../../utils/currentUser';

// الباك إند المنشور لا يوفر مسار /cart، لذلك تُحفظ السلة محلياً
// في localStorage بمفتاح خاص بكل مستخدم حتى لا تختلط سلال الحسابات
const cartKey = () => {
    const user = getCurrentUser();
    return user && user._id ? `cart_${user._id}` : 'cart_guest';
};

const readCart = () => {
    try {
        const items = JSON.parse(localStorage.getItem(cartKey()) || '[]');
        return Array.isArray(items) ? items : [];
    } catch (e) {
        return [];
    }
};

const writeCart = (items) => {
    localStorage.setItem(cartKey(), JSON.stringify(items));
};

// Get cart items
export const getCartItems = () => (dispatch) => {
    dispatch({ type: GET_CART, payload: readCart() });
};

// Add to cart (product = كائن المنتج كاملاً)
export const addToCart = (product, quantity = 1) => (dispatch) => {
    const items = readCart();
    const existing = items.find(i => i._id === product._id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + quantity;
    } else {
        items.push({
            _id: product._id,
            title: product.title,
            price: product.price,
            imageCover: product.imageCover,
            category: product.category,
            brand: product.brand,
            colors: product.colors,
            ratingsAverage: product.ratingsAverage,
            quantity,
        });
    }
    writeCart(items);
    dispatch({ type: ADD_TO_CART, payload: items });
};

// Remove from cart
export const removeFromCart = (id) => (dispatch) => {
    const items = readCart().filter(i => i._id !== id);
    writeCart(items);
    dispatch({ type: REMOVE_FROM_CART, payload: items });
};

// Update cart quantity
export const updateCart = (id, quantity) => (dispatch) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    const items = readCart().map(i => (i._id === id ? { ...i, quantity: safeQuantity } : i));
    writeCart(items);
    dispatch({ type: UPDATE_CART, payload: items });
};

// Clear cart (بعد إتمام الشراء)
export const clearCart = () => (dispatch) => {
    writeCart([]);
    dispatch({ type: GET_CART, payload: [] });
};
