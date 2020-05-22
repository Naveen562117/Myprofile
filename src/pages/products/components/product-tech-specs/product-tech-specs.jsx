 

import React from 'react';
import LazyLoad from 'react-lazyload';

import SectionHeading from '../../../../components/pages-component/section-heading/section-heading';

import ray from '../../assets/images/images-no-padding/ray.png';
import halo from '../../assets/images/images-no-padding/halo.png';
import pentagram from '../../assets/images/images-no-padding/pentagram.png';

import './product-tech-specs.css';

const productTechSpecs = (props) => {
  const productTech = props.techSpecs;
  const techSpecs = productTech.map(techSpec => {
    return (
      <div className="tech-spec flex-row" key={techSpec.id}>
        <span className="tech-spec-heading u-text-left">{techSpec.title}</span>
        <span className="tech-spec-detail u-text-right">{techSpec.description}</span>
      </div>
    );
  });

  const comingSoonDiv = (
    <div className="coming-soon flex-column">
      <span className="main">More Details About the Product</span>
      <br />
      <span className="sub">Coming Soon...</span>
    </div>
  );

  let productImg;
  const pentagramImgStyles = {
    opacity: '.2'
  };

  switch (props.product) {
    case 'ray':
      productImg = <LazyLoad height={200} offset={100} once><img src={ray} alt="Ray" /></LazyLoad>
      break;
    case 'halo':
      productImg = <LazyLoad height={200} offset={100} once><img src={halo} alt="Halo" /></LazyLoad>
      break;
      case 'pentagram':
      productImg = <LazyLoad height={200} offset={100} once><img src={pentagram} alt="Pentagram" style={pentagramImgStyles}/></LazyLoad>
      break;

    default:
      break;
  }

  return (
    <section className="section section--product-tech-specs">
      <div className="container">
        {
          props.product === 'pentagram' ?
          comingSoonDiv :
          null
        }
        <div className="col-12-grid">
          <div className="product-img product-img--left flex-column">
            {productImg}
          </div>
          <div className="tech-specs-container">
            <SectionHeading name={"Technical Specifications"} classValue={"u-margin-bottom-small u-text-center"} />
            <div className="tech-specs flex-column">
              {techSpecs}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default productTechSpecs;