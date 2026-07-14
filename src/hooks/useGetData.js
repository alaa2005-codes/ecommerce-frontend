import baseUrl from '../Api/baseURL';

// إعادة محاولة تلقائية لطلبات القراءة: أول طلب بعد سبات السيرفر يوقظه
// وغالباً تنجح المحاولة التالية، فلا يعلق الموقع عند الزوار الجدد
const getWithRetry = async (url, config, retries = 2) => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await baseUrl.get(url, config);
            return res.data;
        } catch (error) {
            lastError = error;
            // لا نعيد المحاولة إذا رد السيرفر برفض واضح (401/403/404)
            const status = error.response?.status;
            if (status === 401 || status === 403 || status === 404) break;
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }
    }
    console.error("❌ Error in GET request:", url, lastError?.message);
    return lastError?.response?.data || { error: "Request failed" };
};

const useGetData = async (url, params) => {
    return getWithRetry(url, { params });
};

const useGetDataToken = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: params,
    };
    return getWithRetry(url, config);
};

export { useGetData, useGetDataToken };
