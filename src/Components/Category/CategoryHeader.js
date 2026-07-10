import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const CategoryHeader = () => {
    const items = ['الكل', 'الكترونيات', 'ملابس', 'كهربية', 'تخفيضات', 'المزيد']

    return (
        <div className="cat-header">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-start py-2 flex-wrap">
                        {items.map((item, index) => (
                            <div key={`${item}-${index}`} className="cat-text-header">
                                {item}
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CategoryHeader
