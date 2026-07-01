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

    const wishlist = useSelector((state) => state.addToWishListReducer?.wishlist || []);

    useEffect(() => {
        if (wishlist && wishlist.length > 0) {
            setFavProducts(wishlist.map(item => item._id));
        }
    }, [wishlist]);

    return [products, favProducts, loading];
};

export default CardContainerHook;