import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../redux/actions/productsAction';

const ViewHomeProductsHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(8));
    }, [dispatch]);

    const allProducts = useSelector((state) => state.allproducts?.allProducts);

    let items = [];
    if (allProducts && allProducts.data && Array.isArray(allProducts.data)) {
        items = allProducts.data;
    }

    return [items];
};

export default ViewHomeProductsHook;