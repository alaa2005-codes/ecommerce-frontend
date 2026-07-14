import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ActiveCouponsHook from '../../hook/cart/active-coupons-hook'

// قسم يعرض الكوبونات الفعالة (حسب تاريخ الصلاحية) مع نسبة الخصم
const ActiveCoupons = () => {
    const [coupons, loading] = ActiveCouponsHook();

    if (loading || coupons.length === 0) return null;

    return (
        <Row className="my-3">
            <Col xs="12">
                <div className="p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="filter-title mb-2">الكوبونات الفعالة</div>
                    {coupons.map((coupon) => (
                        <div key={coupon._id} className="d-flex justify-content-between border-bottom py-2">
                            <div>
                                <span className="fw-bold">{coupon.discount}% off</span>
                                {' — '}
                                <span>كوبون «{coupon.name}»</span>
                            </div>
                            <div className="text-muted" style={{ fontSize: '13px' }}>
                                صالح حتى {new Date(coupon.expire).toLocaleDateString('ar-EG')}
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
        </Row>
    )
}

export default ActiveCoupons
