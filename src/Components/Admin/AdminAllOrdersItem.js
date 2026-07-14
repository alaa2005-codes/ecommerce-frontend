import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import fixImageUrl from '../../utils/imageUrl'

const AdminAllOrdersItem = ({ order }) => {
    if (!order) {
        return null;
    }

    const firstProduct = order.products?.[0]?.product || {};
    const itemsCount = order.products?.reduce((sum, p) => sum + (p.quantity || 1), 0) || 0;
    const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('ar-EG') : '';

    return (
        <Col sm="12">
            <Link
                to={`/admin/orders/${order._id}`}
                className="cart-item-body my-2 px-1 d-flex"
                style={{ textDecoration: "none" }}
            >
                <img
                    width="160px"
                    height="197px"
                    src={fixImageUrl(firstProduct.imageCover, '/images/mobile.png')}
                    alt={firstProduct.title}
                    onError={(e) => { e.target.src = '/images/mobile.png' }}
                />
                <div className="w-100">
                    <Row className="justify-content-between">
                        <Col sm="12" className="d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 cat-text">
                                طلب رقم #{order.orderNumber || order._id}
                            </div>
                            <div className="d-inline pt-2 cat-text">
                                {order.status || 'قيد المعالجة'}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className="d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                                {firstProduct.title || 'منتج غير معروف'}
                                {order.products && order.products.length > 1 ? ` + ${order.products.length - 1} منتجات أخرى` : ''}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" className="d-flex">
                            <div className="mt-2 cat-text d-inline">العميل :</div>
                            <div className="mt-1 barnd-text d-inline mx-1">
                                {order.user?.name || 'غير معروف'}
                            </div>
                            <div className="mt-2 cat-text d-inline me-3">التاريخ :</div>
                            <div className="mt-1 barnd-text d-inline mx-1">{orderDate}</div>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Col sm="12" className="d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 d-flex">
                                <div className="cat-text pt-1 d-inline">عدد القطع :</div>
                                <div className="barnd-text pt-1 d-inline mx-2">{itemsCount}</div>
                            </div>
                            <div className="d-inline pt-2 barnd-text">
                                {order.totalPrice || 0} ليرة سورية
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    );
};

export default AdminAllOrdersItem;
