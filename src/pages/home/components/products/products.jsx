 

import React from 'react';

import './products.css';

import Product from './components/product/product';

import etherealProducts from './ethereal-products';

const products = (props) => {
  const companyProducts = etherealProducts.map((item) => {
    return (
      <Product
        key={item.id}
        url={item.url}
        name={item.name}
        imgUrl={item.imgUrl}
        width={item.width}
        description={item.description}
      />
    );
  });
  return (
    <div className="products-container three-col-layout">
      {companyProducts}
    </div>
  );
};

export default products;