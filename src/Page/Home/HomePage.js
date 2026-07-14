import React, { useEffect, useState } from 'react';
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Silder from './../../Components/Home/Silder';
import DiscountSection from './../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productsAction';

const HomePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(getAllProducts(8));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    // ✅ استخدم useSelector مباشرة في المكون
    const allProducts = useSelector((state) => state.allproducts?.allProducts);

    // ✅ استخراج البيانات بشكل آمن
    useEffect(() => {
        if (allProducts && allProducts.data && Array.isArray(allProducts.data)) {
            setProducts(allProducts.data);
        } else {
            setProducts([]);
        }
    }, [allProducts]);

    if (loading) {
        return (
            <div className='font' style={{ minHeight: '670px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h3>جاري التحميل...</h3>
            </div>
        );
    }

    return (
        <div className='font' style={{ minHeight: '670px' }}>
            <Silder />
            <HomeCategory />
            <CardProductsContainer products={products} title="الاكثر مبيعا" btntitle="المزيد" pathText="/products" />
            <DiscountSection />
            <CardProductsContainer products={products} title="احدث المنتجات" btntitle="المزيد" pathText="/products" />
            <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />
        </div>
    );
}

export default HomePage;