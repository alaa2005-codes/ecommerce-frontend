import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import UserAllOrderItem from './UserAllOrderItem'
import { getUserOrders } from '../../utils/ordersStore'
import { getCurrentUser } from '../../utils/currentUser'

const UserAllOrder = () => {
    const user = getCurrentUser() || {};
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(getUserOrders(user.email));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="admin-content-text pb-4">اهلا {user.name || ''}</div>
            <Row className='justify-content-between'>
                {orders.length > 0 ? (
                    orders.map((order) => <UserAllOrderItem key={order._id} order={order} />)
                ) : (
                    <div className="user-order mt-2">
                        <Row><div className="py-2 order-title text-center">لا يوجد طلبات حتى الآن</div></Row>
                    </div>
                )}
            </Row>
        </div>
    )
}

export default UserAllOrder
