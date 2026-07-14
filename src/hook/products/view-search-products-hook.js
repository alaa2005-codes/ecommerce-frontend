import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsSearch } from '../../redux/actions/productsAction';

// حدث مشترك لإعادة تطبيق الفلاتر من أي مكون (البحث، الفلاتر الجانبية، الترتيب)
export const FILTERS_CHANGED_EVENT = 'filters-changed';
export const notifyFiltersChanged = () => window.dispatchEvent(new Event(FILTERS_CHANGED_EVENT));

const safeParseArray = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(value) ? value : [];
    } catch (e) {
        return [];
    }
};

// قراءة كل الفلاتر المخزنة (أُلغيت فلترة الأسعار بناء على طلب فريق العمل)
const readFilters = () => ({
    keyword: localStorage.getItem('searchWord') || '',
    categories: safeParseArray('catChecked'),
    brands: safeParseArray('brandChecked'),
    sortType: localStorage.getItem('sortType') || '',
});

// الحقل قد يكون معرفاً مفرداً أو كائناً أو مصفوفة (حسب شكل البيانات في الباك إند)
const idsOf = (field) => {
    if (field === null || field === undefined) return [];
    const list = Array.isArray(field) ? field : [field];
    return list
        .map(f => (typeof f === 'object' && f !== null ? f._id : f))
        .filter(Boolean);
};

// تطبيق البحث وجميع الفلاتر والترتيب معاً (فلاتر مشتركة لا يلغي أحدها الآخر)
const applyFilters = (products, filters) => {
    let result = [...products];

    // بحث بالتطابق الجزئي مثل SQL LIKE (غير حساس لحالة الأحرف)
    const keyword = filters.keyword.trim().toLowerCase();
    if (keyword !== '') {
        result = result.filter(p =>
            (p.title || '').toLowerCase().includes(keyword) ||
            (p.description || '').toLowerCase().includes(keyword)
        );
    }

    if (filters.categories.length > 0) {
        result = result.filter(p => idsOf(p.category).some(id => filters.categories.includes(id)));
    }

    if (filters.brands.length > 0) {
        result = result.filter(p => idsOf(p.brand).some(id => filters.brands.includes(id)));
    }

    switch (filters.sortType) {
        case 'الاكثر مبيعا':
            result.sort((a, b) => (b.sold || 0) - (a.sold || 0));
            break;
        case 'الاعلي تقييما':
            result.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0));
            break;
        case 'السعر من الاقل للاعلي':
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case 'السعر من الاعلي للاقل':
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        default:
            break;
    }

    return result;
};

// تنظيف قيم فلترة الأسعار القديمة المخزنة سابقاً حتى لا تحجب المنتجات دون واجهة لإلغائها
localStorage.removeItem('priceFrom');
localStorage.removeItem('priceTo');

const ViewSearchProductsHook = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.allproducts.allProducts);
    const [items, setItems] = useState([]);

    // جلب المنتجات مرة واحدة ثم الفلترة تتم محلياً
    const getProduct = useCallback(async () => {
        await dispatch(getAllProductsSearch('limit=100'));
    }, [dispatch]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    const refilter = useCallback(() => {
        const data = Array.isArray(allProducts?.data) ? allProducts.data : [];
        setItems(applyFilters(data, readFilters()));
    }, [allProducts]);

    // إعادة الفلترة عند وصول البيانات وعند أي تغيير في الفلاتر
    useEffect(() => {
        refilter();
    }, [refilter]);

    useEffect(() => {
        window.addEventListener(FILTERS_CHANGED_EVENT, refilter);
        return () => window.removeEventListener(FILTERS_CHANGED_EVENT, refilter);
    }, [refilter]);

    return [items, null, null, refilter];
};

export default ViewSearchProductsHook;
