import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav-list.css';

import NavItem from './components/nav-item/nav-item';
import SubList from './components/sub-list/sub-list';
import SubListItem from './components/sub-list/sub-list-item/sub-list-item';
import halo from '../../assets/images/halo-wireframe.svg';
import ray from '../../assets/images/ray-wireframe.svg';
import pentagram from '../../assets/images/pentagram-wireframe.svg';
import concrete from '../../assets/images/concrete-wireframe.svg';

const navList = (props) => {
  const currentPath = window.location.pathname;
  
  return (
    <ul className="nav-list">
      {/* <NavItem linkType={'text'} navLink={true} address={'/home'} name={'Home'} {...props}/> */}
      <NavItem linkType={'text'} navLink={false} address={'#product-sub-list'} name={'Products'} showActive={currentPath.includes('products')}>
        <SubList id={'product-sub-list'}>
          <SubListItem url={ray} width={70} height={70} hasImage link={'/products/ray'} {...props}>
            <span className="subtitle">Ray</span>
            <div className="caption">Smart Dual Extruder 3D Printer</div>
          </SubListItem>
          <SubListItem url={halo} width={70} height={70} hasImage link={'/products/halo'} {...props}>
            <span className="subtitle">Halo</span>
            <div className="caption">Hybrid 5-axis CNC Machine and 3D Printer</div>
          </SubListItem>
          <SubListItem url={pentagram} width={70} height={70} hasImage link={'/products/pentagram'} {...props}>
            <span className="subtitle">Pentagram</span>
            <div className="caption">Desktop Simultaneous 5-axis CNC Machine</div>
          </SubListItem>
          <SubListItem url={concrete} width={70} height={70} hasImage link={'/products/concrete'} {...props}>
            <span className="subtitle">Concrete 3D Printer</span>
            <div className="caption">Automated Concrete Laying Machine</div>
          </SubListItem>
        </SubList>
      </NavItem>
      <NavItem linkType={'text'} navLink={true} address={'/about'} name={'About Us'} {...props}/>
      <NavItem linkType={'text'} navLink={true} address={'/media'} name={'Media'} {...props}/>
      <NavItem linkType={'text'} navLink={true} address={'/blogs'} name={'Blogs'} {...props}/>
      <NavItem linkType={'text'} navLink={true} address={'/careers'} name={'Careers'} {...props}/>
      <NavItem linkType={'text'} navLink={true} address={'/contact'} name={'Contact Us'} {...props}/>
      <NavItem linkType={'text'} navLink={true} address={'/DesignHelp'} name={'Design Help'} {...props}/>
      {
          props.session
          ?
              <NavItem
                  linkType={'img'}
                  img={{
                      url: 'https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6',
                      alt: 'User',
                      width: 40,
                      height: 40
                    }}
                  navLink={false}
                  address={'#user-sub-list'}
              >
                  <SubList type={"left"} id={'user-sub-list'}>
                      <SubListItem link={'/dashboard'}>
                          <span className="subtitle">Dashboard</span>
                      </SubListItem>
                      <SubListItem link={'/'}>
                          <span className="subtitle" onClick={props.logout}>Log Out</span>
                      </SubListItem>
                  </SubList>
              </NavItem>
          :
              null
      }
    </ul>
  );
};

export default navList;
