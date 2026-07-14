import React, { useEffect, useState, useCallback } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import baseUrl from '../../Api/baseURL'
import notify from '../../hook/useNotifaction'
import { cacheCoupons } from '../../hook/cart/active-coupons-hook'

const authConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

const AdminAddCoupon = () => {
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');
    const [expire, setExpire] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCoupons = useCallback(async () => {
        try {
            const res = await baseUrl.get('/coupons?limit=50', authConfig());
            const data = res?.data?.data || [];
            setCoupons(data);
            // تحديث النسخة المحلية حتى يستطيع المستخدم العادي تطبيق الكوبونات
            cacheCoupons(data);
        } catch (e) {
            setCoupons([]);
        }
    }, []);

    useEffect(() => {
        loadCoupons();
    }, [loadCoupons]);

    const onSubmit = async () => {
        if (name.trim() === '') {
            notify('من فضلك ادخل اسم الكوبون', 'error');
            return;
        }
        const discountNumber = Number(discount);
        if (!discount || isNaN(discountNumber) || discountNumber <= 0 || discountNumber > 100) {
            notify('من فضلك ادخل نسبة خصم صحيحة بين 1 و 100', 'error');
            return;
        }
        if (!expire) {
            notify('من فضلك اختر تاريخ انتهاء الكوبون', 'error');
            return;
        }
        if (new Date(expire) <= new Date()) {
            notify('تاريخ الانتهاء يجب ان يكون في المستقبل', 'error');
            return;
        }

        setLoading(true);
        try {
            await baseUrl.post('/coupons', {
                name: name.trim(),
                discount: discountNumber,
                expire,
            }, authConfig());
            notify('تم اضافة الكوبون بنجاح', 'success');
            setName('');
            setDiscount('');
            setExpire('');
            await loadCoupons();
        } catch (e) {
            const msg = e?.response?.data?.errors?.[0]?.msg || e?.response?.data?.message;
            notify(msg || 'حدث خطأ اثناء اضافة الكوبون', 'error');
        }
        setLoading(false);
    };

    const onDelete = async (id) => {
        try {
            await baseUrl.delete(`/coupons/${id}`, authConfig());
            notify('تم حذف الكوبون بنجاح', 'warn');
            await loadCoupons();
        } catch (e) {
            notify('حدث خطأ اثناء حذف الكوبون', 'error');
        }
    };

    const isActive = (c) => c.expire && new Date(c.expire) > new Date();

    return (
        <div>
            <Row className="justify-content-start">
                <div className="admin-content-text pb-4">اضافه كوبون جديد</div>
                <Col sm="8">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الكوبون (مثال: SALE10)"
                    />
                    <input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        type="number"
                        min="1"
                        max="100"
                        className="input-form d-block mt-3 px-3"
                        placeholder="نسبة الخصم % (مثال: 10)"
                    />
                    <label className="d-block mt-3" style={{ color: '#555550', fontSize: '14px' }}>تاريخ انتهاء الكوبون</label>
                    <input
                        value={expire}
                        onChange={(e) => setExpire(e.target.value)}
                        type="date"
                        className="input-form d-block mt-2 px-3"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end">
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className="btn-save d-inline mt-3">
                        {loading ? 'جاري الحفظ...' : 'حفظ الكوبون'}
                    </button>
                </Col>
            </Row>

            <Row className="mt-5">
                <div className="admin-content-text pb-2">الكوبونات الحالية ({coupons.length})</div>
                <Col sm="10">
                    {coupons.length > 0 ? (
                        <Table striped bordered hover size="sm" className="text-center">
                            <thead>
                                <tr>
                                    <th>الاسم</th>
                                    <th>الخصم</th>
                                    <th>تاريخ الانتهاء</th>
                                    <th>الحالة</th>
                                    <th>حذف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((c) => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{c.discount}%</td>
                                        <td>{new Date(c.expire).toLocaleDateString('ar-EG')}</td>
                                        <td>{isActive(c) ? 'فعال' : 'منتهي'}</td>
                                        <td>
                                            <span
                                                onClick={() => onDelete(c._id)}
                                                style={{ cursor: 'pointer', color: '#d9534f' }}>
                                                حذف
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="py-3">لا يوجد كوبونات حتى الآن</div>
                    )}
                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default AdminAddCoupon
