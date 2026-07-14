import baseUrl from '../Api/baseURL';

// أصل (origin) سيرفر الـ API — الملفات المرفوعة تُقدَّم من نفس المضيف
// تحت المسارات /categories و /products و /brands ...
const API_ORIGIN = (() => {
    try {
        return new URL(baseUrl.defaults.baseURL).origin;
    } catch (e) {
        return '';
    }
})();

// مجلدات الرفع المعروفة في الباك إند
const UPLOAD_FOLDERS = /^\/(categories|products|brands|users)\//i;

/**
 * يصلح رابط أي صورة قادمة من قاعدة البيانات بشكل ديناميكي:
 * - روابط بمضيف قديم/معطل تُعاد كتابتها على مضيف الـ API الحالي
 * - روابط كاملة مدموجة داخل رابط آخر (مثل ...//categories/https://...) تُستخرج
 * - أسماء ملفات بدون مضيف تُبنى على مضيف الـ API
 * - الشرطات المائلة المكررة تُطبَّع
 */
const fixImageUrl = (raw, fallback = '') => {
    if (!raw || typeof raw !== 'string') return fallback;

    let value = raw.trim();
    if (value === '') return fallback;

    // استخراج رابط كامل مدموج داخل الرابط (آخر ظهور لـ http)
    const lastHttp = Math.max(value.lastIndexOf('https://'), value.lastIndexOf('http://'));
    if (lastHttp > 0) {
        value = value.substring(lastHttp);
    }

    // روابط data والمسارات المحلية (أصول الواجهة في public/) تُترك كما هي
    if (/^(data:|blob:)/i.test(value)) return value;

    // اسم ملف أو مسار نسبي بدون مضيف
    if (!/^https?:\/\//i.test(value)) {
        const path = `/${value.replace(/^\/+/, '')}`;
        // فقط ملفات مجلدات الرفع تُبنى على مضيف الـ API
        if (UPLOAD_FOLDERS.test(path)) {
            return `${API_ORIGIN}${path}`;
        }
        return value;
    }

    try {
        const url = new URL(value);
        const path = url.pathname.replace(/\/{2,}/g, '/');
        // أي ملف مرفوع في مجلدات الرفع يُقدَّم من مضيف الـ API الحالي
        if (UPLOAD_FOLDERS.test(path)) {
            return `${API_ORIGIN}${path}`;
        }
        return `${url.origin}${path}${url.search}`;
    } catch (e) {
        return fallback || raw;
    }
};

export default fixImageUrl;
