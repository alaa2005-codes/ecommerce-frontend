import baseUrl from '../Api/baseURL';

const useGetData = async (url, params) => {
    try {
        const res = await baseUrl.get(url, { params });
        return res.data;
    } catch (error) {
        console.error("❌ Error in GET request:", error);
        return error.response?.data || { error: "Request failed" };
    }
};

const useGetDataToken = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: params,
    };
    try {
        const res = await baseUrl.get(url, config);
        return res.data;
    } catch (error) {
        console.error("❌ Error in GET (Token) request:", error);
        return error.response?.data || { error: "Request failed" };
    }
};

export { useGetData, useGetDataToken };