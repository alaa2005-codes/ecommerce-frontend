import React from 'react'
import { Card, Col } from 'react-bootstrap'

import rate from "../../images/rate.png";
import { Link } from 'react-router-dom';
import fixImageUrl from '../../utils/imageUrl';

const ProductCard = ({ item }) => {

    return (
        <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
            <Card
                className="my-2"
                style={{
                    width: "100%",
                    height: "345px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
                }}>
                <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Img
                        style={{ height: "228px", width: "100%", objectFit: "cover" }}
                        src={fixImageUrl(item.imageCover, '/images/mobile.png')}
                        alt={item.title}
                        onError={(e) => { e.target.src = '/images/mobile.png' }}
                    />
                </Link>
                <Card.Body>
                    <Card.Title className="card-title">
                        {item.title}
                    </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex">
                            <img
                                className=""
                                src={rate}
                                alt=""
                                height="16px"
                                width="16px"
                            />
                            <div className="card-rate mx-2">{item.ratingsAverage || 0}</div>
                        </div>
                        <div className="d-flex">
                            <div className="card-price">{item.price}</div>
                            <div className="card-currency mx-1">ليرة سورية</div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
