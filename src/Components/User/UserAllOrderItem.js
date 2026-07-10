import React from 'react'
import { Row, Col } from 'react-bootstrap'
import UserAllOrderCard from './UserAllOrderCard'

const UserAllOrderItem = ({ order }) => {
    if (!order) {
        return (
            <div className="user-order mt-2">
                <Row><div className="py-2 order-title">لا يوجد طلبات</div></Row>
            </div>
        );
    }
    return (
        <div className="user-order mt-2">
            <Row>
                <div className="py-2 order-title">
                    طلب رقم #{order.orderNumber || order._id}
                </div>
            </Row>
            {order.products && order.products.map((item, index) => (
                <UserAllOrderCard key={index} item={item} />
            ))}
            <Row className="d-flex justify-content-between">
                <Col xs="6" className="">
                    <div>
                        <div className="d-inline">الحالة</div>
                        <div className="d-inline mx-2 stat">
                            {order.status || 'قيد التنفيذ'}
                        </div>
                    </div>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div>
                        <div className="barnd-text">
                            {order.totalPrice || 0} ليرة سورية
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderItem