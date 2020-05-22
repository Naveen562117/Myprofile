 

import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

import './home.css';

import PageBanner from '../../components/ui/page-banner/page-banner';
import SectionHeading from '../../components/pages-component/section-heading/section-heading';
import ContactUsBanner from '../../components/pages-component/contact-us-banner/contact-us-banner';
import HomePageMedia from './components/home-page-media/home-page-media';
import CompanyFeatures from './components/company-features/company-features';
import Products from './components/products/products';

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="page page--home">
        <PageBanner heading={"Welcome to MediaCannibal   "} subHeading={"We build the future of manufacturing. We create entrepreneurs."} classValue={"page-banner--home"} />
        <section className="company-brief">
          <div className="container">
            <div className="detail-text">
              <p>MediaCannibal    is a leading manufacturer of 5-axis CNC   and 3D Printers in India, based out of Bangalore. Our flagship product the MediaCannibal  Halo, combines the technologies of subtractive and additive manufacturing into one bundle to replicate the capabilities of a large factory on a desktop scale.</p>
              <p>Our other products are MediaCannibal  Ray, MediaCannibal  pentagram and MediaCannibal  3D Concrete Printer.</p>
            </div>
          </div>
        </section>
        <section className="section section--products">
          <div className="container">
            {/* <SectionHeading name={"Our wide range of industrial grade products"} classValue={"u-margin-bottom-big u-text-center"} /> */}
            <LazyLoad height={200} offset={200} once>
              <Products />
            </LazyLoad>
          </div>
        </section>
        <section className="section section--why-us section--background-fill">
          <div className="container">
            <SectionHeading name={"What Defines Us"} classValue={"u-margin-bottom-big u-text-center u-text-white"} />
            <LazyLoad height={200} offset={200} once>
              <CompanyFeatures />
            </LazyLoad>
          </div>
        </section>
        <section className="section section--in-media">
          <div className="container">
            <SectionHeading name={"MediaCannibal    in Media"} classValue={"u-margin-bottom-big u-text-center"} />
            <LazyLoad height={200} offset={200} once>
              <HomePageMedia />
            </LazyLoad>
          </div>
        </section>
        {/* <section className="section section--contact-us">
          <div className="container">
            <SectionHeading name={"Contact Us"} classValue={"u-margin-bottom-big u-text-center"} />
            <LazyLoad height={200} offset={200} once>
              <ContactUsBanner
                firstText={"Let's get going!"}
                secondText={"We want to talk to you as well."}
              />
            </LazyLoad>
          </div>
    </section>*/}
      </div>
    );
  }
}

export default Home;