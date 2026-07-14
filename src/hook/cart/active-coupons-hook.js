import { useEffect, useState } from 'react';
import baseUrl from '../../Api/baseURL';

// نسخة محلية من الكوبونات: نقطة /coupons في الباك إند مقيدة بالأدمن والمدير،
// لذلك تُخزَّن الكوبونات محلياً عند كل جلب ناجح (من جلسة الأدمن) حتى يستطيع
// المستخدم العادي رؤيتها وتطبيقها في السلة.
const CACHE_KEY = 'coupons_cache';

export const cacheCoupons = (coupons) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(coupons || []));
    } catch (e) { /* تجاهل */ }
};

const readCache = () => {
    try {
        const value = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
        return Array.isArray(value) ? value : [];
    } catch (e) {
        return [];
    }
};

// الكوبونات الفعالة فقط (غير منتهية الصلاحية)
const onlyActive = (coupons) => {
    const now = new Date();
    return (coupons || []).filter(c => c.expire && new Date(c.expire) > now);
};

const ActiveCouponsHook = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await baseUrl.get('/coupons?limit=50', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const data = res?.data?.data || [];
                cacheCoupons(data);
                setCoupons(onlyActive(data));
            } catch (e) {
                // المستخدم العادي ممنوع من القراءة (403) → استخدم النسخة المحلية
                setCoupons(onlyActive(readCache()));
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    return [coupons, loading];
};

export default ActiveCouponsHook;
