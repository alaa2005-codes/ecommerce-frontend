import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import notify from '../useNotifaction';
import { createReview } from './../../redux/actions/reviewAction';
import { getCurrentUser } from '../../utils/currentUser';

const AddRateHook = (id) => {

    const dispatch = useDispatch();
    const [rateText, setRateText] = useState('')
    const [rateValue, setRateValue] = useState(0)
    const [loading, setLoading] = useState(true)

    const OnChangeRateText = (e) => {
        setRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setRateValue(val)
    }

    const user = getCurrentUser() || '';

    // حفظ التعليق
    const onSubmit = async () => {
        if (rateText.trim() === "") {
            notify("من فضلك اكتب تعليق", "error")
            return
        }
        if (!rateValue || rateValue < 1) {
            notify("من فضلك اختر تقييماً (نجمة واحدة على الأقل)", "error")
            return
        }
        setLoading(true)
        // الباك إند يتوقع الحقلين title و ratings
        await dispatch(createReview(id, {
            title: rateText,
            ratings: rateValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.reviewReducer.createView)

    useEffect(() => {
        if (loading === false && res) {
            if (res.status && res.status === 201) {
                notify("Your comment has been added successfully", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1200);
            } else if (res.status && res.status === 403) {
                notify("غير مسموح للادمن او المدير بالتعليق", "error")
            } else {
                const backendMsg = res?.data?.errors?.[0]?.msg || res?.data?.message;
                if (backendMsg === "You already added review on this product") {
                    notify("لقد قمت باضافة تعليق لهذا المنتج مسبقا", "error")
                } else if (backendMsg) {
                    notify(backendMsg, "error")
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit]
}

export default AddRateHook
