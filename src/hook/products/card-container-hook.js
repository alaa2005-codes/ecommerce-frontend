import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../redux/actions/wishListAction';

const CardContainerHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [favProducts, setFavProducts] = useState([]);

    const products = useSelector((state) => state.allproducts?.allProducts?.data || []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                await dispatch(getProductWishList());
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [dispatch]);

    const wishlist = useSelector((state) => state.addToWishListReducer?.allWishList);

    useEffect(() => {
        if (Array.isArray(wishlist?.data)) {
            setFavProducts(wishlist.data.map(item => item?._id).filter(Boolean));
        } else {
            setFavProducts([]);
        }
    }, [wishlist]);

    return [products, favProducts, loading];
};

export default CardContainerHook;