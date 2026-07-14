import React from 'react'
import { Row, Col } from 'react-bootstrap'
import fixImageUrl from '../../utils/imageUrl'

const labelStyle = { color: "#555550", fontFamily: "Almarai", fontSize: "16px" };
const valueStyle = { color: "#979797", fontFamily: "Almarai", fontSize: "16px" };

const AdminOrderDetalis = ({ order }) => {
    if (!order) {
        return (
            <div className='admin-content-text py-5 text-center'>الطلب غير موجود</div>
        );
    }

    return (
        <div>
            <div className='admin-content-text'>تفاصيل الطلب رقم #{order.orderNumber}</div>

            {order.products && order.products.map((item, index) => (
                <Col key={index} xs="12" className="cart-item-body my-2 d-flex px-2">
                    <img
                        width="120px"
                        height="150px"
                        src={fixImageUrl(item.product?.imageCover, '/images/mobile.png')}
                        alt={item.product?.title}
                        onError={(e) => { e.target.src = '/images/mobile.png' }}
                    />
                    <div className="w-100 px-3 py-2">
                        <div className="cat-title">{item.product?.title || 'منتج غير معروف'}</div>
                        <div className="mt-2">
                            <span className="cat-text">الكمية : </span>
                            <span className="barnd-text mx-1">{item.quantity || 1}</span>
                        </div>
                        <div className="mt-2">
                            <span className="cat-text">السعر : </span>
                            <span className="barnd-text mx-1">{item.product?.price || 0} ليرة سورية</span>
                        </div>
                    </div>
                </Col>
            ))}

            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className="d-flex">
                    <div className="admin-content-text py-2">تفاصيل العميل</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>الاسم:</div>
                    <div style={valueStyle} className="mx-2">{order.user?.name || 'غير محدد'}</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>رقم الهاتف:</div>
                    <div style={valueStyle} className="mx-2">{order.user?.phone || 'غير محدد'}</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>البريد الإلكتروني:</div>
                    <div style={valueStyle} className="mx-2">{order.user?.email || 'غير محدد'}</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>العنوان:</div>
                    <div style={valueStyle} className="mx-2">{order.address || 'غير محدد'}</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>طريقة الدفع:</div>
                    <div style={valueStyle} className="mx-2">
                        {order.paymentMethodType === 'card' ? 'بطاقة ائتمان' : 'الدفع عند الاستلام'}
                    </div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>الحالة:</div>
                    <div style={valueStyle} className="mx-2">{order.status || 'قيد المعالجة'}</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div style={labelStyle}>تاريخ الطلب:</div>
                    <div style={valueStyle} className="mx-2">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString('ar-EG') : 'غير محدد'}
                    </div>
                </Col>
                <Col xs="12" className="d-flex border-top mt-2 pt-2">
                    <div style={labelStyle}>الإجمالي:</div>
                    <div className="barnd-text mx-2">{order.totalPrice || 0} ليرة سورية</div>
                </Col>
            </Row>
        </div>
    )
}

export default AdminOrderDetalis
