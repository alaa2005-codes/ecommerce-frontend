import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import SearchCountResult from '../../Components/Uitily/SearchCountResult'
import SideFilter from '../../Components/Uitily/SideFilter'
import ViewSearchProductsHook from './../../hook/products/view-search-products-hook';

const ShopProductsPage = () => {

    const [items, , , getProduct] = ViewSearchProductsHook();

    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <SearchCountResult onClick={getProduct} title={`هناك ${items.length} نتيجة بحث`} />
                <Row className='d-flex flex-row'>
                    <Col sm="3" xs="4" md="2" className='d-flex'>
                        <SideFilter />
                    </Col>
                    <Col sm="9" xs="8" md="10">
                        <CardProductsContainer products={items} title="" btntitle="" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ShopProductsPage
