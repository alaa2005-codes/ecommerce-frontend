import React from 'react'
import { Row, Col, Card, Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import AdminUsersHook from './../../hook/admin/admin-users-hook'

const AdminUsersPage = () => {
    const [users, loading, name, email, phone, password, role,
        onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeRole,
        onSubmit, handelDelete] = AdminUsersHook()

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        handelDelete(deleteId);
        setShowDelete(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="font">ادارة المستخدمين</h1>
                <Button variant="dark" onClick={handleShowAdd}>اضف مستخدم جديد</Button>
            </div>

            <Modal show={showAdd} onHide={handleCloseAdd} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>اضف مستخدم جديد</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>الاسم</Form.Label>
                            <Form.Control type="text" value={name} onChange={onChangeName} placeholder="اسم المستخدم" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>الايميل</Form.Label>
                            <Form.Control type="email" value={email} onChange={onChangeEmail} placeholder="example@email.com" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>رقم الهاتف</Form.Label>
                            <Form.Control type="text" value={phone} onChange={onChangePhone} placeholder="01012345678" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>كلمة السر</Form.Label>
                            <Form.Control type="password" value={password} onChange={onChangePassword} placeholder="******" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>الدور</Form.Label>
                            <Form.Select value={role} onChange={onChangeRole}>
                                <option value="user">مستخدم</option>
                                <option value="manager">مدير</option>
                                <option value="admin">ادمن</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="dark" type="submit">حفظ</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>تاكيد الحذف</Modal.Title>
                </Modal.Header>
                <Modal.Body>هل انت متاكد من حذف هذا المستخدم؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseDelete}>تراجع</Button>
                    <Button variant="dark" onClick={confirmDelete}>حذف</Button>
                </Modal.Footer>
            </Modal>

            <Row className="my-3">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((item, index) => (
                        <Col xs="12" sm="6" md="4" lg="3" key={index} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <Card.Title>{item.name}</Card.Title>
                                        <Button variant="danger" size="sm" onClick={() => handleShowDelete(item._id)}>حذف</Button>
                                    </div>
                                    <Card.Text>
                                        <div>الايميل: {item.email}</div>
                                        <div>الهاتف: {item.phone}</div>
                                        <div>الدور: {item.role === 'admin' ? 'ادمن' : item.role === 'manager' ? 'مدير' : 'مستخدم'}</div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center">لا يوجد مستخدمين</p>
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default AdminUsersPage