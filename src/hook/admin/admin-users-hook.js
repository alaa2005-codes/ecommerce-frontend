import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, createUser, deleteUser } from '../../redux/actions/userAction';
import notify from '../useNotifaction';

const AdminUsersHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    useEffect(() => {
        dispatch(getAllUsers(50));
    }, [dispatch]);

    const allUsers = useSelector((state) => state.user.users);

    const onChangeName = (e) => setName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePhone = (e) => setPhone(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeRole = (e) => setRole(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            notify('من فضلك اكمل البيانات', 'warn');
            return;
        }
        setLoadingCreate(true);
        await dispatch(createUser({
            name, email, phone, password, passwordConfirm: password, role
        }));
        setLoadingCreate(false);
    };

    const resCreate = useSelector(state => state.user.createUser);

    useEffect(() => {
        if (loadingCreate === false) {
            if (resCreate && resCreate.status === 201) {
                notify('تم اضافة المستخدم بنجاح', 'success');
                setName('');
                setEmail('');
                setPhone('');
                setPassword('');
                setRole('user');
                dispatch(getAllUsers(50));
            } else {
                notify('هناك مشكلة في الاضافة', 'error');
            }
            setLoadingCreate(true);
        }
    }, [loadingCreate]);

    const handelDelete = async (id) => {
        setLoadingDelete(true);
        await dispatch(deleteUser(id));
        setLoadingDelete(false);
    };

    const resDelete = useSelector(state => state.user.deleteUser);

    useEffect(() => {
        if (loadingDelete === false) {
            if (resDelete && resDelete.status === 204) {
                notify('تم حذف المستخدم بنجاح', 'success');
                dispatch(getAllUsers(50));
            } else {
                notify('هناك مشكلة في الحذف', 'error');
            }
            setLoadingDelete(true);
        }
    }, [loadingDelete]);

    let users = [];
    if (allUsers && allUsers.data && Array.isArray(allUsers.data)) {
        users = allUsers.data;
    }

    return [
        users, loading,
        name, email, phone, password, role,
        onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeRole,
        onSubmit, handelDelete
    ];
};

export default AdminUsersHook;