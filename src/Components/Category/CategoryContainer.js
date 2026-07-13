import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import CategoryCard from './../Category/CategoryCard';

const CategoryContainer = ({ data, loading }) => {
    const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#FF6262", "#0034FF", "#FFD3E8"]
    const categories = Array.isArray(data) ? data : []

    return (
        <Container>
            <div className="admin-content-text mt-2 ">كل التصنيفات</div>
            <Row className='my-2 d-flex justify-content-between'>
                {loading === false ? (
                    categories.length > 0 ? (
                        categories.map((item, index) => (
                            <CategoryCard
                                key={item._id || index}
                                title={item?.name || 'تصنيف'}
                                img={item?.image || ''}
                                background={colors[index % colors.length]}
                            />
                        ))
                    ) : (
                        <h4>لا يوجد تصنيفات</h4>
                    )
                ) : (
                    <Spinner animation="border" variant="primary" />
                )}
            </Row>
        </Container>
    )
}

export default CategoryContainer
