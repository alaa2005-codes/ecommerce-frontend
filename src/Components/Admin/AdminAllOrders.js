import React from 'react'
import { Row } from 'react-bootstrap'
import AdminAllOrdersItem from './AdminAllOrdersItem'

const AdminAllOrders = () => {
    const orders = [];

    return (
        <div>
            <div className='admin-content-text'>ادارة جميع الطلبات</div>
            <Row className='justify-content-start'>
                {orders.length > 0 ? (
                    orders.map((order) => <AdminAllOrdersItem key={order._id || Math.random()} order={order} />)
                ) : (
                    <div className='text-center py-5 w-100'>لا توجد طلبات حتى الآن</div>
                )}
            </Row>
        </div>
    )
}

export default AdminAllOrders
