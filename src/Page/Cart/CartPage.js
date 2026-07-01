import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CartCheckout from '../../Components/Cart/CartCheckout'
import CartItem from '../../Components/Cart/CartItem'
import { getCartItems } from '../../redux/actions/cartAction'

const CartPage = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart?.cartItems || [])

    useEffect(() => {
        dispatch(getCartItems())
    }, [dispatch])

    return (
        <Container style={{ minHeight: '670px' }}>
            <Row>
                <div className='cart-title mt-4'>سلة التسوق</div>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xs="12" md="9">
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-5">سلة التسوق فارغة</div>
                    )}
                </Col>
                <Col xs="6" md="3">
                    <CartCheckout />
                </Col>
            </Row>
        </Container>
    )
}

export default CartPage