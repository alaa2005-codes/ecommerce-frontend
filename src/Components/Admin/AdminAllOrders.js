import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import AdminAllOrdersItem from './AdminAllOrdersItem'
import { getAllOrders } from '../../utils/ordersStore'

const AdminAllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(getAllOrders());
    }, []);

    return (
        <div>
            <div className='admin-content-text'>ادارة جميع الطلبات ({orders.length})</div>
            <Row className='justify-content-start'>
                {orders.length > 0 ? (
                    orders.map((order) => <AdminAllOrdersItem key={order._id} order={order} />)
                ) : (
                    <div className='text-center py-5 w-100'>لا توجد طلبات حتى الآن</div>
                )}
            </Row>
        </div>
    )
}

export default AdminAllOrders
