import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { clearCart, getCartItems } from '../../redux/actions/cartAction';
import { createOrder } from '../../utils/ordersStore';
import { isNormalUser } from '../../utils/currentUser';
import notify from '../../hook/useNotifaction';

const ChoosePayMethoud = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const cartItems = useSelector(state => state.cart?.cartItems || []);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0
    );

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            notify('سلة التسوق فارغة، أضف منتجات أولاً', 'error');
            return;
        }
        const order = createOrder({ cartItems, paymentMethodType: paymentMethod, address });
        dispatch(clearCart());
        notify(`تم إتمام الطلب بنجاح! رقم طلبك #${order.orderNumber}`, 'success');
        setTimeout(() => {
            navigate('/user/allorders');
        }, 1500);
    };

    return (
        <Container style={{ minHeight: '670px' }} className="py-4">
            <h4>اختر طريقة الدفع</h4>
            <div className="product-price d-inline-block px-3 py-2 my-3 border">
                الإجمالي: {totalPrice} ليرة سورية ({cartItems.length} منتج)
            </div>
            <Form>
                {
                    // حقل العنوان مخفي تماماً عن المستخدم العادي
                    !isNormalUser() && (
                        <Form.Group>
                            <Form.Label>العنوان</Form.Label>
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                    )
                }
                <Form.Group className="my-3">
                    <Form.Label>طريقة الدفع</Form.Label>
                    <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="cash">الدفع عند الاستلام</option>
                        <option value="card">بطاقة ائتمان</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="success" onClick={handleCheckout}>إتمام الشراء</Button>
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default ChoosePayMethoud;
