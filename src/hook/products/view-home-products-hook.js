import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../redux/actions/productsAction';

const ViewHomeProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts(8)) // أضفت الرقم 8
    }, [])

    const allProducts = useSelector((state) => state.productsReducer.allProducts) // غيرت المسار

    let items = [];
    if (allProducts && allProducts.data)
        items = allProducts.data.slice(0, 4);
    else
        items = []

    return [items]
}

export default ViewHomeProductsHook