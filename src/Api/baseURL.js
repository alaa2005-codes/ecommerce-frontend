import axios from 'axios';

// مهلة زمنية إجبارية لكل طلب: سيرفر Railway المجاني يدخل بوضع السبات أحياناً
// وبدون timeout يبقى الطلب معلقاً للأبد فلا تظهر التصنيفات ولا المنتجات إطلاقاً
const baseUrl = axios.create({
  baseURL: "https://nodejs-ecommerce-api-v1-production-a56b.up.railway.app/api/v1",
  timeout: 20000,
});

export default baseUrl;