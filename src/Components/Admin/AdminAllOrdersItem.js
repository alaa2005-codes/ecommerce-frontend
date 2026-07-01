import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AdminAllOrdersItem = ({ order }) => {
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
                    src={order.product?.imageCover || '/images/mobile.png'}
                    alt={order.product?.title} 
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
                                {order.product?.title || 'منتج غير معروف'}
                            </div>
                            <div className="d-inline pt-2 cat-rate me-2">
                                {order.product?.ratingsAverage || 0}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" className="d-flex">
                            <div className="mt-2 cat-text d-inline">الماركة :</div>
                            <div className="mt-1 barnd-text d-inline mx-1">
                                {order.product?.brand?.name || 'غير محدد'}
                            </div>
                            {order.product?.colors && order.product.colors.length > 0 && (
                                <div
                                    className="color me-1 border"
                                    style={{ backgroundColor: order.product.colors[0] }}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Col sm="12" className="d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 d-flex">
                                <div className="cat-text pt-1 d-inline">الكميه</div>
                                <input
                                    className="mx-2 mt-1"
                                    type="number"
                                    style={{ width: "40px", height: "25px" }}
                                    value={order.quantity || 1}
                                    min="1"
                                    readOnly
                                />
                            </div>
                            <div className="d-inline pt-2 barnd-text">
                                {order.totalPrice || order.product?.price || 0} ليرة سورية
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    );
};

export default AdminAllOrdersItem;