import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import fallbackImage from '../../images/avatar.png'
import fixImageUrl from '../../utils/imageUrl'
import { notifyFiltersChanged } from '../../hook/products/view-search-products-hook'

const CategoryCard = ({ background, img, title, id }) => {
    const navigate = useNavigate();
    // إصلاح رابط الصورة ديناميكياً حتى تظهر أي صورة مرفوعة حديثاً
    const [imageSrc, setImageSrc] = useState(() => fixImageUrl(img, fallbackImage))

    useEffect(() => {
        setImageSrc(fixImageUrl(img, fallbackImage))
    }, [img])

    // الضغط على التصنيف يفتح المتجر مفلتراً بمنتجات هذا التصنيف فقط
    const handleClick = () => {
        if (!id) return;
        localStorage.setItem('catChecked', JSON.stringify([id]));
        localStorage.setItem('searchWord', '');
        notifyFiltersChanged();
        navigate('/products');
    };

    return (
        <Col
            xs="6"
            sm="6"
            md="4"
            lg="2"
            className="my-4 d-flex justify-content-around ">
            <div
                className="allCard mb-3"
                onClick={handleClick}
                style={{ cursor: id ? 'pointer' : 'default' }}>
                <div
                    className="categoty-card "
                    style={{ backgroundColor: `${background}` }}></div>{" "}
                <img
                    alt={title}
                    src={imageSrc}
                    onError={() => setImageSrc(fallbackImage)}
                    className="categoty-card-img"
                />
                <p className="categoty-card-text my-2">{title}</p>
            </div>
        </Col>
    )
}

export default CategoryCard
