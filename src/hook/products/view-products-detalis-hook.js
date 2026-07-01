import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike } from '../../redux/actions/productsAction';
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';

const ViewProductsDetalisHook = (prodID) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getOneProduct(prodID));
    }, [prodID]);

    const oneProducts = useSelector((state) => state.allproducts.oneProduct);
    const oneCategory = useSelector((state) => state.allCategory.oneCategory);
    const oneBrand = useSelector((state) => state.allBrand.oneBrand);
    const productLike = useSelector((state) => state.allproducts.productLike);

    let item = [];
    if (oneProducts && oneProducts.data) {
        item = oneProducts.data;
    }

    useEffect(() => {
        if (item.category) {
            dispatch(getOneCategory(item.category));
        }
        if (item.brand) {
            dispatch(getOneBrand(item.brand));
        }
        if (item.category) {
            dispatch(getProductLike(item.category));
        }
    }, [item, dispatch]);

    let images = [];
    if (item.images && item.images.length > 0) {
        images = item.images.map((img) => ({ original: img }));
    } else {
        images = [{ original: '/images/mobile.png' }];
    }

    let cat = [];
    if (oneCategory && oneCategory.data) {
        cat = oneCategory.data;
    }

    let brand = [];
    if (oneBrand && oneBrand.data) {
        brand = oneBrand.data;
    }

    let prod = [];
    if (productLike && productLike.data) {
        prod = productLike.data;
    }

    return [item, images, cat, brand, prod];
}

export default ViewProductsDetalisHook;