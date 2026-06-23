import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { getAllBrand } from '../../redux/actions/brandAction'

const HomeBrandHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBrand());
    }, [])
     //get last brand state from redux
    const brandData = useSelector(state => state.allBrand.brand)
    //get last loading state from redux
    const loading = useSelector(state => state.allBrand.loading)
   
    let brand = [];
    if (brandData && brandData.data) {
        brand = brandData.data.slice(0, 5);
    } else {
        brand = [];
    }

    return [brand, loading]
};

export default HomeBrandHook;
