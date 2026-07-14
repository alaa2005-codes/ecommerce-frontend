import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook';
import { addToCart } from '../../redux/actions/cartAction';
import { isNormalUser } from '../../utils/currentUser';
import notify from '../../hook/useNotifaction';

const ProductText = () => {
  const { id } = useParams();
  const [item, images, cat, brand, , , , subCategories] = ViewProductsDetalisHook(id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!item || !item._id) return;
    dispatch(addToCart(item, 1));
    notify("تمت إضافة المنتج إلى السلة بنجاح", "success");
  };

  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{cat.name} :</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {item.title}
            <div className="cat-rate d-inline mx-3">{item.ratingsAverage}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="barnd-text d-inline mx-1">{brand.name} </div>
        </Col>
      </Row>
      {
        subCategories && subCategories.length > 0 ? (
          <Row>
            <Col md="8" className="mt-2">
              <div className="cat-text d-inline">التصنيف الفرعي :</div>
              <div className="barnd-text d-inline mx-1">
                {subCategories.map(s => s.name).join('، ')}
              </div>
            </Col>
          </Row>
        ) : null
      }
      <Row>
        <Col md="8" className="mt-1 d-flex">
          {
            item.availableColors ? (item.availableColors.map((color, index) => {
              return (<div
                key={index}
                className="color ms-2 border"
                style={{ backgroundColor: color }}></div>)
            })) : null
          }


        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {item.description}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">{item.price} ليرة سورية</div>
          {
            // زر الإضافة للسلة يظهر للمستخدم العادي فقط (مخفي عن الأدمن والمدير)
            // وبعد اكتمال تحميل بيانات المنتج حتى لا تكون الإضافة فارغة
            isNormalUser() && item._id ? (
              <div
                onClick={handleAddToCart}
                style={{ cursor: 'pointer' }}
                className="product-cart-add px-3 py-3 d-inline mx-3">اضف للسلة</div>
            ) : null
          }
        </Col>
      </Row>
    </div>
  )
}

export default ProductText
