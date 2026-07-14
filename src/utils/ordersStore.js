import { getCurrentUser } from './currentUser';

// الباك إند المنشور لا يوفر مسارات طلبات شغالة (GET /orders يرجع 502
// وإنشاء الطلب يتطلب cart غير موجود)، لذلك تُحفظ الطلبات محلياً في localStorage
// بمفتاح واحد مشترك حتى يراها الأدمن ويديرها.
const KEY = 'orders_all';

const read = () => {
    try {
        const value = JSON.parse(localStorage.getItem(KEY));
        return Array.isArray(value) ? value : null;
    } catch (e) {
        return null;
    }
};

const write = (orders) => localStorage.setItem(KEY, JSON.stringify(orders));

// طلبات توضيحية أولية (بمنتجات حقيقية من المتجر) تُزرع مرة واحدة فقط
// عند أول استخدام حتى لا تكون صفحة إدارة الطلبات فارغة
const seedOrders = () => [
    {
        _id: 'ord-seed-1',
        orderNumber: 1001,
        user: { name: 'أحمد العلي', email: 'ahmad.ali@example.com', phone: '0991111222' },
        products: [
            { product: { _id: '6a3a9e78521bc1228e5a7076', title: 'Samsung Galaxy A07 Pro 1', price: 299, imageCover: '/images/mobile.png', ratingsAverage: 4 }, quantity: 1 },
            { product: { _id: '6a3d201421abdf253cbd3796', title: 'pro sync wireless earbuds', price: 1250, imageCover: '/images/mobile.png', ratingsAverage: 0 }, quantity: 1 },
        ],
        totalPrice: 1549,
        paymentMethodType: 'cash',
        address: 'دمشق - المزة',
        status: 'قيد المعالجة',
        createdAt: '2026-07-10T10:30:00.000Z',
    },
    {
        _id: 'ord-seed-2',
        orderNumber: 1002,
        user: { name: 'سارة الخطيب', email: 'sara.khatib@example.com', phone: '0992333444' },
        products: [
            { product: { _id: '6a3a9e78521bc1228e5a7077', title: 'Samsung Galaxy A07 Pro 2', price: 299, imageCover: '/images/mobile.png', ratingsAverage: 4 }, quantity: 2 },
        ],
        totalPrice: 598,
        paymentMethodType: 'card',
        address: 'حلب - الفرقان',
        status: 'تم التوصيل',
        createdAt: '2026-07-11T14:00:00.000Z',
    },
    {
        _id: 'ord-seed-3',
        orderNumber: 1003,
        user: { name: 'محمد الحسن', email: 'mohamad.hasan@example.com', phone: '0993555666' },
        products: [
            { product: { _id: '6a3a9e78521bc1228e5a7079', title: 'Samsung Galaxy A07 Pro 4', price: 299, imageCover: '/images/mobile.png', ratingsAverage: 4 }, quantity: 1 },
        ],
        totalPrice: 299,
        paymentMethodType: 'cash',
        address: 'حمص - الوعر',
        status: 'قيد المعالجة',
        createdAt: '2026-07-12T09:15:00.000Z',
    },
];

// طلب صالح للعرض = يحتوي منتجات ببياناتها الكاملة
const isValidOrder = (o) =>
    o && Array.isArray(o.products) && o.products.length > 0 &&
    o.products.every(p => p && p.product && p.product.title);

// كل الطلبات (الأحدث أولاً) — مع تنظيف أي طلبات قديمة ناقصة البيانات
// وإعادة زرع البيانات الأولية إذا لم يبق شيء صالح
export const getAllOrders = () => {
    let orders = read();
    if (orders !== null) {
        const valid = orders.filter(isValidOrder);
        if (valid.length !== orders.length) {
            orders = valid;
            write(orders);
        }
    }
    if (orders === null || orders.length === 0) {
        orders = seedOrders();
        write(orders);
    }
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// طلبات مستخدم معين (بالبريد الإلكتروني)
export const getUserOrders = (email) => {
    if (!email) return [];
    return getAllOrders().filter(o => o.user?.email === email);
};

// طلب واحد بالمعرف
export const getOrder = (id) => getAllOrders().find(o => o._id === id) || null;

// إنشاء طلب جديد من عناصر السلة للمستخدم المسجل حالياً
export const createOrder = ({ cartItems, paymentMethodType, address }) => {
    const orders = read() || seedOrders();
    const user = getCurrentUser() || {};
    const products = (cartItems || []).map(item => ({
        product: {
            _id: item._id,
            title: item.title,
            price: item.price,
            imageCover: item.imageCover,
            ratingsAverage: item.ratingsAverage || 0,
        },
        quantity: item.quantity || 1,
    }));
    const totalPrice = (cartItems || []).reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0
    );
    const maxNumber = orders.reduce((max, o) => Math.max(max, o.orderNumber || 1000), 1000);
    const order = {
        _id: `ord-${Date.now()}`,
        orderNumber: maxNumber + 1,
        user: { name: user.name || 'مستخدم', email: user.email || '', phone: user.phone || '' },
        products,
        totalPrice,
        paymentMethodType: paymentMethodType || 'cash',
        address: address || '',
        status: 'قيد المعالجة',
        createdAt: new Date().toISOString(),
    };
    orders.push(order);
    write(orders);
    return order;
};
