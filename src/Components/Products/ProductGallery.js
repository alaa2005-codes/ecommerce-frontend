import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook';

const ProductGallery = () => {
    const { id } = useParams();
    const [item, images, cat, brand] = ViewProductsDetalisHook(id);

    const itemsWithFallback = images.map(img => ({
        ...img,
        renderItem: () => (
            <img
                src={img.original}
                alt=""
                style={{ width: '100%', height: '500px', objectFit: 'contain' }}
                onError={(e) => { e.target.src = '/images/mobile.png' }}
            />
        ),
    }));

    return (
        <div className="product-gallary-card d-flex justfiy-content-center  align-items-center
        pt-2">
            <ImageGallery items={itemsWithFallback}
                showFullscreenButton={false}
                isRTL={true}
                showPlayButton={false}
                showThumbnails={false}
                renderRightNav={RightButton}
                renderLeftNav={LeftButton}
            />
        </div>
    )
}

export default ProductGallery