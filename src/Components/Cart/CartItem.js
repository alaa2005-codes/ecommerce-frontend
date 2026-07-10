import React from 'react'
import { Col, Row } from 'react-bootstrap'
import deleteicon from '../../images/delete.png'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/actions/cartAction'

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart(item._id));
    };

    return (
        <Col xs="12" className="cart-item-body my-2 d-flex px-2">
            <img 
                width="160px" 
                height="197px" 
                src={item.imageCover || '/images/mobile.png'} 
                alt={item.title} 
                onError={(e) => { e.target.src = '/images/mobile.png' }}
            />
            <div className="w-100">
                <Row className="justify-content-between">
                    <Col sm="12" className="d-flex flex-row justify-content-between">
                        <div className="d-inline pt-2 cat-text">
                            {item.category?.name || 'غير مصنف'}
                        </div>
                        <div 
                            className="d-flex pt-2" 
                            style={{ cursor: "pointer" }} 
                            onClick={handleRemove}
                        >
                            <img src={deleteicon} alt="" width="20px" height="24px" />
                            <div className="cat-text d-inline me-2">ازاله</div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col sm="12" className="d-flex flex-row justify-content-start">
                        <div className="d-inline pt-2 cat-title">
                            {item.title}
                        </div>
                        <div className="d-inline pt-2 cat-rate me-2">
                            {item.ratingsAverage || 0}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="mt-1">
                        <div className="cat-text d-inline">الماركة :</div>
                        <div className="barnd-text d-inline mx-1">
                            {item.brand?.name || 'غير محدد'}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="mt-1 d-flex">
                        {item.colors && item.colors.map((color, index) => (
                            <div
                                key={index}
                                className="color ms-2 border"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Col sm="12" className="d-flex flex-row justify-content-between">
                        <div className="d-inline pt-2 d-flex">
                            <div className="cat-text d-inline">الكميه</div>
                            <input
                                className="mx-2"
                                type="number"
                                style={{ width: "40px", height: "25px" }}
                                value={item.quantity || 1}
                                min="1"
                            />
                        </div>
                        <div className="d-inline pt-2 barnd-text">
                            {item.price} ليرة سورية
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    );
};

export default CartItem;