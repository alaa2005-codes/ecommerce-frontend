import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/actions/userAction';
import { Button, Form } from 'react-bootstrap';

const UserAddAddress = () => {
    const dispatch = useDispatch();
    const [alias, setAlias] = useState('');
    const [details, setDetails] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');

    const handleAdd = () => {
        dispatch(addAddress({ alias, details, phone, city, postCode }));
        setAlias('');
        setDetails('');
        setPhone('');
        setCity('');
        setPostCode('');
    };

    return (
        <div>
            <h4>إضافة عنوان جديد</h4>
            <Form>
                <Form.Group><Form.Label>الاسم المستعار</Form.Label><Form.Control value={alias} onChange={(e) => setAlias(e.target.value)} /></Form.Group>
                <Form.Group><Form.Label>التفاصيل</Form.Label><Form.Control value={details} onChange={(e) => setDetails(e.target.value)} /></Form.Group>
                <Form.Group><Form.Label>رقم الهاتف</Form.Label><Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} /></Form.Group>
                <Form.Group><Form.Label>المدينة</Form.Label><Form.Control value={city} onChange={(e) => setCity(e.target.value)} /></Form.Group>
                <Form.Group><Form.Label>الرمز البريدي</Form.Label><Form.Control value={postCode} onChange={(e) => setPostCode(e.target.value)} /></Form.Group>
                <Button variant="primary" onClick={handleAdd}>إضافة العنوان</Button>
            </Form>
        </div>
    );
};

export default UserAddAddress;