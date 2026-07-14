import React from 'react'
import { Row } from 'react-bootstrap'
import SidebarSearchHook from '../../hook/search/sidebar-search-hook';

const SideFilter = () => {
  const [category, brand, clickCategory, clickBrand, priceFrom, priceTo, catChecked, brandChecked, from, to] = SidebarSearchHook();

  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input
              onChange={clickCategory}
              type="checkbox"
              value="0"
              checked={catChecked.length === 0}
              readOnly={catChecked.length === 0}
            />
            <div className="filter-sub me-2 ">الكل</div>
          </div>
          {
            category.length > 0 ? (category.map((item) => {
              return (
                <div key={item._id} className="d-flex mt-3">
                  <input
                    onChange={clickCategory}
                    type="checkbox"
                    value={item._id}
                    checked={catChecked.includes(item._id)}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              )
            })) : <h6>لا يوجد تصنيفات</h6>
          }
        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">الماركة</div>
          <div className="d-flex mt-3">
            <input
              onChange={clickBrand}
              type="checkbox"
              value="0"
              checked={brandChecked.length === 0}
              readOnly={brandChecked.length === 0}
            />
            <div className="filter-sub me-2 ">الكل</div>
          </div>

          {
            brand.length > 0 ? (brand.map((item) => {
              return (
                <div key={item._id} className="d-flex mt-3">
                  <input
                    onChange={clickBrand}
                    type="checkbox"
                    value={item._id}
                    checked={brandChecked.includes(item._id)}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              )
            })) : <h6>لا يوجد ماركات</h6>
          }
        </div>

        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
            value={from}
            onChange={priceFrom}
            className="m-2 text-center"
            type="number"
            min="0"
            style={{ width: "70px", height: "25px" }}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            value={to}
            onChange={priceTo}
            className="m-2 text-center"
            type="number"
            min="0"
            style={{ width: "70px", height: "25px" }}
          />
        </div>
      </Row >
    </div >
  )
}

export default SideFilter
