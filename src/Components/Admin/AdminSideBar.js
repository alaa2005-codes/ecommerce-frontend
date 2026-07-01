import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminSideBar = () => {
    const user = useSelector(state => state.authReducer.user)

    return (
        <div className="sidebar">
            <div className="d-flex flex-column">
                {/* القوائم المشتركة بين admin و manager */}
                {(user?.role === 'admin' || user?.role === 'manager') && (
                    <>
                        <Link to="/admin/allorders" style={{ textDecoration: 'none' }}>
                            <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
                                اداره الطلبات
                            </div>
                        </Link>
                        <Link to="/admin/allproducts" style={{ textDecoration: 'none' }}>
                            <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                                اداره المنتجات
                            </div>
                        </Link>
                        <Link to="/admin/addbrand" style={{ textDecoration: 'none' }}>
                            <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                                اضف ماركه
                            </div>
                        </Link>
                        <Link to="/admin/addcategory" style={{ textDecoration: 'none' }}>
                            <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                                اضف تصنيف
                            </div>
                        </Link>
                        <Link to="/admin/addsubcategory" style={{ textDecoration: 'none' }}>
                            <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                                اضف تصنيف فرعي
                            </div>
                        </Link>
                        <Link to="/admin/addproduct" style={{ textDecoration: 'none' }}>
                            <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                                اضف منتج
                            </div>
                        </Link>
                    </>
                )}

                {/* قوائم خاصة بـ admin فقط */}
                {user?.role === 'admin' && (
                    <Link to="/admin/users" style={{ textDecoration: 'none' }}>
                        <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                            ادارة المستخدمين والمديرين
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default AdminSideBar