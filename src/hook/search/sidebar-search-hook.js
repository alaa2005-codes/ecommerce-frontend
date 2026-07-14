import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from './../../redux/actions/brandAction';
import { notifyFiltersChanged } from './../products/view-search-products-hook';

const safeParseArray = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(value) ? value : [];
    } catch (e) {
        return [];
    }
};

const SidebarSearchHook = () => {
    const dispatch = useDispatch();

    // جلب التصنيفات والماركات عند أول تحميل
    useEffect(() => {
        dispatch(getAllCategory(50));
        dispatch(getAllBrand(50));
    }, [dispatch])

    const allCat = useSelector(state => state.allCategory.category)
    const allBrand = useSelector(state => state.allBrand.brand)

    const category = allCat?.data || [];
    const brand = allBrand?.data || [];

    const [catChecked, setCatChecked] = useState(() => safeParseArray('catChecked'))
    const [brandChecked, setBrandChecked] = useState(() => safeParseArray('brandChecked'))
    const [from, setFrom] = useState(localStorage.getItem('priceFrom') || '')
    const [to, setTo] = useState(localStorage.getItem('priceTo') || '')

    const saveAndNotify = (key, value) => {
        localStorage.setItem(key, value)
        notifyFiltersChanged()
    }

    // عند اختيار تصنيف
    const clickCategory = (e) => {
        const value = e.target.value
        let newChecked;
        if (value === '0') {
            newChecked = []
        } else if (e.target.checked) {
            newChecked = [...catChecked, value]
        } else {
            newChecked = catChecked.filter(id => id !== value)
        }
        setCatChecked(newChecked)
        saveAndNotify('catChecked', JSON.stringify(newChecked))
    }

    // عند اختيار ماركة
    const clickBrand = (e) => {
        const value = e.target.value
        let newChecked;
        if (value === '0') {
            newChecked = []
        } else if (e.target.checked) {
            newChecked = [...brandChecked, value]
        } else {
            newChecked = brandChecked.filter(id => id !== value)
        }
        setBrandChecked(newChecked)
        saveAndNotify('brandChecked', JSON.stringify(newChecked))
    }

    const priceFrom = (e) => {
        setFrom(e.target.value)
        saveAndNotify('priceFrom', e.target.value)
    }
    const priceTo = (e) => {
        setTo(e.target.value)
        saveAndNotify('priceTo', e.target.value)
    }

    return [category, brand, clickCategory, clickBrand, priceFrom, priceTo, catChecked, brandChecked, from, to]
}

export default SidebarSearchHook
