import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminOrderDetalis from '../../Components/Admin/AdminOrderDetalis'
import { getOrder } from '../../utils/ordersStore'

const AdminOrderDetalisPage = () => {
    const { id } = useParams();
    const order = getOrder(id);

    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminOrderDetalis order={order} />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrderDetalisPage
