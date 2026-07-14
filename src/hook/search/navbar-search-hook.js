import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { notifyFiltersChanged } from './../products/view-search-products-hook';

const NavbarSearchHook = () => {
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || '')

    // عند كتابة كلمة البحث
    const OnChangeSearch = (e) => {
        localStorage.setItem('searchWord', e.target.value)
        setSearchWord(e.target.value)
        notifyFiltersChanged()
        if (window.location.pathname !== '/products') {
            navigate('/products')
        }
    }

    return [OnChangeSearch, searchWord]
}

export default NavbarSearchHook
