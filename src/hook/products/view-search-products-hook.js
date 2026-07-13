import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsSearch } from '../../redux/actions/productsAction';

const ViewSearchProductsHook = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.allproducts.allProducts);

    const getProduct = async () => {
        const searchWord = localStorage.getItem("searchWord") || "";
        await dispatch(getAllProductsSearch(`keyword=${searchWord}`));
    };

    useEffect(() => {
        getProduct();
    }, []);

    return [products?.data || [], products?.paginationResult, null, getProduct];
};

export default ViewSearchProductsHook;