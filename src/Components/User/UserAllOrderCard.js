import React from 'react'
import { Row, Col } from 'react-bootstrap'
import fixImageUrl from '../../utils/imageUrl'

const UserAllOrderCard = ({ item }) => {
    return (
        <div>
            <Row className="d-flex mb-2">
                <Col xs="3" md="2" className="d-flex justify-content-start">
                    <img 
                        width="93px" 
                        height="120px" 
                        src={fixImageUrl(item.product?.imageCover, '/images/mobile.png')}
                        alt={item.product?.title} 
                        onError={(e) => { e.target.src = '/images/mobile.png' }}
                    />
                </Col>
                <Col xs="8" md="6">
                    <div className="d-inline pt-2 cat-title">
                        {item.product?.title || 'منتج غير معروف'}
                    </div>
                    <div className="d-inline pt-2 cat-rate me-2">
                        {item.product?.ratingsAverage || 0}
                    </div>
                    <div className="rate-count d-inline p-1 pt-2">
                        ({item.product?.ratingsQuantity || 0} تقييم)
                    </div>
                    <div className="mt-3">
                        <div className="cat-text d-inline">الكميه</div>
                        <input
                            className="mx-2"
                            type="number"
                            style={{ width: "40px", height: "25px" }}
                            value={item.quantity || 1}
                            min="1"
                            readOnly
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderCard