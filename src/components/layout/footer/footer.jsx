
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './footer.css';

import logoWithName from '../../../assets/images/logo/logo-with-name-white.svg';
import ces from './assets/images/ces.png';
import makeInIndia from './assets/images/make-in-india.png';
import startupIndia from './assets/images/startup-india.svg';

/* Importing social media icons */
import facebook from './assets/images/social-media-icons/facebook.svg';
import insta from './assets/images/social-media-icons/instagram.png';
import linkedin from './assets/images/social-media-icons/linkedin.svg';
import twitter from './assets/images/social-media-icons/twitter.svg';
import youtube from './assets/images/social-media-icons/youtube.svg';
import {connect} from 'react-redux'

import Logo from '../logo/logo';


class Footer extends Component{
  render(){
    if(this.props.blog === true){
      return null
    }else{
      return(
      <footer className="footer">
        <div className="container container--footer">
          <div className="footer-box">
            <div className="logo-col">
              <Logo url={logoWithName} width={80} height={95} id={"footer-logo"}/>
              <div className="govt-initiative">
                <img src={ces} alt="CES" className="ces-logo" height="60"/>
                <img src={makeInIndia} alt="Make In India" className="make-in-india-logo" height="40"/>
                <img src={startupIndia} alt="Startup India" className="startup-india-logo" height="25"/>
              </div>
            </div>
            <div className="footer-col-divider" content="company-items">
              <div className="footer-title">Company</div>
              <ul className="links-list">
                {/* <li className="link-item">
                  <NavLink to="/home" exact>Home</NavLink>
                </li> */}
                <li className="link-item">
                  <NavLink to="/about">About Us</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to="/media">Media</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to="/blogs">Blogs</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to="/careers">Careers</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-col-divider" content="product-items">
              <div className="footer-title">Products</div>
              <ul className="links-list">
                <li className="link-item">
                  <NavLink to='/products/ray'>Ray</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to='/products/halo'>Halo</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to='/products/pentagram'>Pentagram</NavLink>
                </li>
                <li className="link-item">
                  <NavLink to='/products/concrete'>Concrete 3D Printer</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-col-divider" content="social-media">
              <div className="footer-title">Connect with us</div>
              <ul className="links-list" type="social-media-list">
                <li className="link-item link-item--social-media">
                  <a href="#" target="_blank">
                    <img src={facebook} alt="Facebook" width="30" height="30" />
                  </a>
                </li>
                <li className="link-item link-item--social-media">
                  <a href="#" target="_blank">
                    <img src={insta} alt="Instagram" width="30" height="30" />
                  </a>
                </li>
                <li className="link-item link-item--social-media">
                  <a href="#" target="_blank">
                    <img src={twitter} alt="Twitter" width="30" height="30" />
                  </a>
                </li>
                <li className="link-item link-item--social-media">
                  <a href="#" target="_blank">
                    <img src={linkedin} alt="Linkedin" width="30" height="30" />
                  </a>
                </li>
                <li className="link-item link-item--social-media">
                  <a href="https://www.youtube.com/channel/UCW8I3771Afa4v_KkATxw2EA" target="_blank">
                    <img src={youtube} alt="YouTube" width="30" height="30" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright-box">
            Copyright &copy; 2018. MediaCannibal    Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    )
    }
    
  }
}

const mapStateToProps = (state) => {
  return{
    blog: state.blog.contentOpen
  }
};

export default connect(mapStateToProps,null, null, {pure:false})(Footer)