 

import React from 'react';

import './company-feature.css';

const companyFeature = (props) => {
  const styles = {
    backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${props.url})`
  };

  return (
    <div className="company-feature">
      <div className="company-feature-img-container flex-row" style={styles}>
        {/* <img src={props.url} alt="Icon" width="100" height="100"/> */}
      </div>
      <div className="company-feature-details">
        <div className="subtitle">
          <span>{props.subtitle}</span>
        </div>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default companyFeature;