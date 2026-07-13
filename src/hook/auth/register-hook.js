import React, { useState, useEffect } from 'react'
import notify from './../useNotifaction';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom'
const RegisterHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const validationValues = () => {
        if (name.trim() === "") {
            notify("من فضلك ادخل اسم المستخدم", "error")
            return false;
        }
        if (!phone || phone.length < 11) {
            notify("من فضلك ادخل رقم هاتف صحيح", "error")
            return false;
        }
        if (password !== confirmPassword) {
            notify("من فضلك تاكيد من كلمه السر", "error")
            return false;
        }
        return true;
    }

    const res = useSelector(state => state.authReducer?.createUser)

    //save data
    const OnSubmit = async () => {
        if (!validationValues()) return;

        setLoading(true)
        await dispatch(createNewUser({
            name,
            email,
            password,
            passwordConfirm: confirmPassword,
            phone
        }))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false && res) {
            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token)
                notify("تم تسجيل الحساب بنجاح", "success")
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            }

            const errorMessage = res?.data?.errors?.[0]?.msg;
            if (errorMessage === "E-mail already in use") {
                notify("هذا الايميل مسجل من قبل", "error")
            } else if (errorMessage === "accept only egypt phone numbers") {
                notify("يجب ان يكون الرقم مصري مكون من 11 رقم", "error")
            } else if (errorMessage === "must be at least 6 chars") {
                notify("يجب ان لاقل كلمه السر عن 6 احرف او ارقام", "error")
            }
        }
    }, [loading, res, navigate])

    return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit]
}

export default RegisterHook