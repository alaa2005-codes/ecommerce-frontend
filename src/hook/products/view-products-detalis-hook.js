import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct, getProductLike } from '../../redux/actions/productsAction';
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import fixImageUrl from '../../utils/imageUrl';

const ViewProductsDetalisHook = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                await dispatch(getOneProduct(id));
                setLoading(false);
            } catch (err) {
                if (err.response?.status === 401) {
                    setError('Please log in to view product details');
                } else if (err.response?.status === 404) {
                    setError('المنتج غير موجود');
                } else {
                    setError('حدث خطأ في تحميل المنتج');
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, id]);

    const productData = useSelector(state => state.allproducts?.oneProduct);
    const likeData = useSelector(state => state.allproducts?.productLike);

    let item = {};
    let images = [];
    let cat = {};
    let brand = {};

    if (productData && productData.data) {
        item = productData.data;
        if (item.images && Array.isArray(item.images) && item.images.length > 0) {
            images = item.images.map(img => ({ original: fixImageUrl(img, '/images/mobile.png') }));
        } else if (item.imageCover) {
            images = [{ original: fixImageUrl(item.imageCover, '/images/mobile.png') }];
        } else {
            images = [{ original: '/images/mobile.png' }];
        }
        cat = item.category || {};
        brand = item.brand || {};
    }

    // جلب منتجات مشابهة + التصنيفات الفرعية للتصنيف بعد معرفة تصنيف المنتج الحالي
    const categoryId = typeof item.category === 'object' ? item.category?._id : item.category;
    useEffect(() => {
        if (categoryId) {
            dispatch(getProductLike(categoryId));
            dispatch(getOneCategory(categoryId));
        }
    }, [dispatch, categoryId]);

    // أسماء التصنيفات الفرعية للمنتج (المخزنة كمعرفات) من قائمة فرعيات التصنيف
    const subCatList = useSelector(state => state.subCategory?.subcategory);
    let subCategories = [];
    if (item.subCategory && item.subCategory.length > 0 && Array.isArray(subCatList?.data)) {
        const ids = item.subCategory.map(s => (typeof s === 'object' && s !== null ? s._id : s));
        subCategories = subCatList.data.filter(s => ids.includes(s._id));
    }

    // منتجات قد تعجبك (نستبعد المنتج الحالي)
    let similarProducts = [];
    if (likeData && Array.isArray(likeData.data)) {
        similarProducts = likeData.data.filter(p => p._id !== id).slice(0, 4);
    }

    return [item, images, cat, brand, loading, error, similarProducts, subCategories];
};

export default ViewProductsDetalisHook;
