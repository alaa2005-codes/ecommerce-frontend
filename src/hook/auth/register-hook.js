import { useState, useEffect } from 'react'
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
    const [isPress, setIsPress] = useState(false)

    const onChangeName = (e) => setName(e.target.value)
    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePhone = (e) => setPhone(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)
    const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const validationValues = () => {
        if (name.trim() === "") {
            notify("من فضلك ادخل اسم المستخدم", "error")
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            notify("من فضلك ادخل بريد الكتروني صحيح", "error")
            return false;
        }
        // رقم موبايل سوري: يبدأ بـ 09 (10 أرقام) أو بمفتاح سوريا +963
        const cleanPhone = phone.trim().replace(/[\s-]/g, '');
        if (!/^(09\d{8}|(\+|00)9639\d{8})$/.test(cleanPhone)) {
            notify("يجب ادخال رقم هاتف يبدأ ببداية سورية (09 أو +963) ويتكون من 10 أرقام", "error")
            return false;
        }
        if (password.length < 6) {
            notify("يجب ان لا تقل كلمه السر عن 6 احرف او ارقام", "error")
            return false;
        }
        if (password !== confirmPassword) {
            notify("من فضلك تاكد من تطابق كلمه السر", "error")
            return false;
        }
        return true;
    }

    const res = useSelector(state => state.authReducer?.createUser)

    // إرسال بيانات التسجيل — لا يُرسل أي حقل رتبة (role):
    // الباك إند يعيّن رتبة "user" افتراضياً لكل حساب جديد من هذه الواجهة
    const OnSubmit = async () => {
        if (!validationValues()) return;

        setIsPress(true)
        setLoading(true)
        await dispatch(createNewUser({
            name: name.trim(),
            email: email.trim(),
            password,
            passwordConfirm: confirmPassword,
            phone: phone.trim()
        }))
        setLoading(false)
        setIsPress(false)
    }

    useEffect(() => {
        if (loading === false && res) {
            if (res?.data?.token) {
                notify("تم تسجيل الحساب بنجاح", "success")
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
                return;
            }

            const errorMessage = res?.data?.errors?.[0]?.msg || res?.data?.message;
            if (errorMessage === "E-mail already in use") {
                notify("هذا الايميل مسجل من قبل", "error")
            } else if (errorMessage && errorMessage.toLowerCase().includes("phone")) {
                notify("يجب ادخال رقم هاتف يبدأ ببداية سورية (09 أو +963) ويتكون من 10 أرقام", "error")
            } else if (errorMessage === "must be at least 6 chars") {
                notify("يجب ان لا تقل كلمه السر عن 6 احرف او ارقام", "error")
            } else if (errorMessage) {
                notify(errorMessage, "error")
            } else {
                notify("حدث خطأ اثناء التسجيل، حاول مرة اخرى", "error")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit, isPress]
}

export default RegisterHook
