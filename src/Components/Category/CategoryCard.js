import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import fallbackImage from '../../images/avatar.png'

const CategoryCard = ({ background, img, title }) => {
    const [imageSrc, setImageSrc] = useState(img || fallbackImage)

    useEffect(() => {
        setImageSrc(img || fallbackImage)
    }, [img])

    return (
        <Col
            xs="6"
            sm="6"
            md="4"
            lg="2"
            className="my-4 d-flex justify-content-around ">
            <div className="allCard mb-3 ">
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
