import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import ProductDetalis from '../../Components/Products/ProductDetalis'
import RateContainer from '../../Components/Rate/RateContainer'
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook';
import { isLoggedIn, isAdminOrManager } from '../../utils/currentUser'

// محتوى الصفحة لمستخدم مسجل (مكوّن منفصل حتى لا تُستدعى الـ hooks شرطياً)
const ProductDetalisContent = () => {
    const { id } = useParams();
    const [item, images, cat, brand, loading, error, similarProducts] = ViewProductsDetalisHook(id);

    if (error) {
        return (
            <Container style={{ minHeight: '670px' }} className="d-flex flex-column align-items-center justify-content-center">
                <h4>{error}</h4>
            </Container>
        )
    }

    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <ProductDetalis />
                {
                    isAdminOrManager() ? (
                        <div className="text-center my-4 p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                            <h6 className="m-0">Comments hidden for managers</h6>
                        </div>
                    ) : (
                        <RateContainer rateAvg={item?.ratingsAverage || 0} rateQty={item?.ratingsQuantity || 0} />
                    )
                }
                <CardProductsContainer products={similarProducts} title="منتجات قد تعجبك" />
                <ToastContainer />
            </Container>
        </div>
    )
}

const ProductDetalisPage = () => {
    // فحص تسجيل الدخول قبل عرض تفاصيل المنتج
    if (!isLoggedIn()) {
        return (
            <Container style={{ minHeight: '670px' }} className="d-flex flex-column align-items-center justify-content-center">
                <h4 className="my-3">Please log in to view product details</h4>
                <p className="text-muted">يرجى تسجيل الدخول لعرض تفاصيل المنتج</p>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button className="btn-login px-4">تسجيل الدخول</button>
                </Link>
            </Container>
        )
    }

    return <ProductDetalisContent />
}

export default ProductDetalisPage
