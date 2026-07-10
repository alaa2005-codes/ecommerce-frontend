import React, { useState, useEffect } from 'react'
import notify from './../useNotifaction';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, loginUser } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../Api/baseURL';

const LoginHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async () => {
        if (!email.trim() || !password.trim()) {
            notify("من فضلك أدخل البريد الإلكتروني وكلمة المرور", "error")
            return
        }

        setIsPress(true)
        setLoading(true)
        await dispatch(loginUser({
            email,
            password
        }))

        setLoading(false)
        setIsPress(false)
    }
    const res = useSelector(state => state.authReducer?.loginUser)
    useEffect(() => {
        const completeLogin = async () => {
            if (loading === false && res) {
                if (res?.data?.token) {
                    const loginPayload = res?.data || {};
                    const userData = loginPayload?.data || loginPayload?.user || loginPayload || {};
                    let profile = userData;

                    try {
                        const meResponse = await baseUrl.get('/users/getMe', {
                            headers: { Authorization: `Bearer ${res.data.token}` }
                        });
                        profile = meResponse?.data?.data || meResponse?.data?.user || meResponse?.data || userData;
                    } catch (error) {
                        console.error('Failed to load profile after login', error);
                    }

                    if (!profile?.role && userData?.role) {
                        profile.role = userData.role;
                    }

                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", JSON.stringify(profile))
                    notify("تم تسجيل الدخول بنجاح", "success")
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                } else {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }

                if (res?.data?.message === "Incorrect email or password") {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    notify("كلمة السر او الايميل خطا", "error")
                }
            }
        };

        completeLogin();
    }, [loading, res, navigate])

    return [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress]
}

export default LoginHook