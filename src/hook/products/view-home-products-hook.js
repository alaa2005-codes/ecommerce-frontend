import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../redux/actions/productsAction';

const ViewHomeProductsHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(8)); // ✅ أضفت الرقم 8
    }, [dispatch]); // ✅ أضفت dispatch كـ dependency

    // ✅ التعديل الأساسي: غيرت المسار إلى productsReducer
    const allProducts = useSelector((state) => state.productsReducer?.allProducts);

    let items = [];
    if (allProducts && allProducts.data) {
        items = allProducts.data; // ✅ عرض كل البيانات (بدون slice)
    }

    return [items];
};

export default ViewHomeProductsHook;