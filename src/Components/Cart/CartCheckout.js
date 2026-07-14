import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ActiveCouponsHook from '../../hook/cart/active-coupons-hook'
import notify from '../../hook/useNotifaction'

const CartCheckout = ({ cartItems = [] }) => {
    const [couponCode, setCouponCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const [coupons] = ActiveCouponsHook()

    const subtotal = cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
    )
    const total = Math.round(subtotal * (1 - discount / 100))

    const applyCoupon = () => {
        const code = couponCode.trim()
        if (code === '') {
            notify('من فضلك أدخل كود الخصم', 'error')
            return
        }
        const matched = coupons.find(
            c => c.name.toLowerCase() === code.toLowerCase()
        )
        if (matched) {
            setDiscount(matched.discount)
            notify(`تم تطبيق كوبون «${matched.name}» بخصم ${matched.discount}%`, 'success')
        } else {
            setDiscount(0)
            notify('الكوبون غير صالح أو منتهي الصلاحية', 'error')
        }
    }

    return (
        <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
            <Col xs="12" className="d-flex  flex-column  ">
                <div className="d-flex  ">
                    <input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="copon-input d-inline text-center "
                        placeholder="كود الخصم"
                    />
                    <button onClick={applyCoupon} className="copon-btn d-inline ">تطبيق</button>
                </div>
                <div className="product-price d-inline w-100 my-3  border">
                    {total} ليرة سورية
                    {discount > 0 && (
                        <div style={{ fontSize: '13px' }} className="text-success">
                            (خصم {discount}% من {subtotal})
                        </div>
                    )}
                </div>
                <Link
                    to="/order/paymethoud"
                    style={{ textDecoration: "none" }}
                    className="product-cart-add  d-inline ">
                    <button className="product-cart-add w-100 px-2" disabled={cartItems.length === 0}> اتمام الشراء</button>
                </Link>
            </Col>
        </Row>
    )
}

export default CartCheckout
