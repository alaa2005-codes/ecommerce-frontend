import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/actions/orderAction';
import { Button, Form } from 'react-bootstrap';

const ChoosePayMethoud = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartItems);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleCheckout = () => {
        const products = cart.map(item => ({ product: item._id, quantity: item.quantity }));
        dispatch(createOrder({ products, totalPrice: cart.reduce((sum, i) => sum + i.price * i.quantity, 0), address, paymentMethod }));
    };

    return (
        <div>
            <h4>اختر طريقة الدفع</h4>
            <Form>
                <Form.Group><Form.Label>العنوان</Form.Label><Form.Control value={address} onChange={(e) => setAddress(e.target.value)} /></Form.Group>
                <Form.Group>
                    <Form.Label>طريقة الدفع</Form.Label>
                    <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="cash">الدفع عند الاستلام</option>
                        <option value="card">بطاقة ائتمان</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="success" onClick={handleCheckout}>إتمام الشراء</Button>
            </Form>
        </div>
    );
};

export default ChoosePayMethoud;