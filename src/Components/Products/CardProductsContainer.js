import React from 'react'
import { Container, Row } from 'react-bootstrap'
import SubTiltle from '../Uitily/SubTiltle'
import ProductCard from './ProductCard'

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {

    if (!products || products.length === 0) {
        return (
            <Container>
                <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
                <Row className='my-2 d-flex justify-content-between'>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <h5>لا توجد منتجات</h5>
                    </div>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
            <Row className='my-2 d-flex justify-content-between'>
                {products.map((item) => (
                    <ProductCard key={item._id} item={item} />
                ))}
            </Row>
        </Container>
    )
}

export default CardProductsContainer
