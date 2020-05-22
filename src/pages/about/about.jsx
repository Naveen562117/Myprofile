 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import axios from '../../services/axios/axios';
import * as actionType from '../../store/actions/action-type';
// import { Helmet } from "react-helmet";
import DocumentMeta from 'react-document-meta';

// importing the API used for this page
import getMedia from '../../services/api/get-team';

import './about.css';

// importing UI component used
import PageBanner from '../../components/ui/page-banner/page-banner';
import SectionHeading from '../../components/pages-component/section-heading/section-heading';
import AboutUs from './components/about-us/about-us';
import Team from './components/team/team';
import EtherealJourney from './components/ethereal-journey/ethereal-journey';
import ContactUsBanner from '../../components/pages-component/contact-us-banner/contact-us-banner';

class About extends Component {
  state = {
    loadingContent: this.props.firstRun ? true : false
  }

  onGetTeam = (data) => {
    this.setState({
      loadingContent: false
    });

    if (data.status === 'error') {
      data.data.response ? console.log(data.data.response) : console.log(data.data);
    } else {
      this.props.onUpdateFirstRun(false);
      this.props.onUpdateTeamItems(data);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.firstRun) {
      getMedia(this.onGetTeam);
    }
  }

  render () {

    const meta = {
      title: 'About Us | MediaCannibal    | Bangalore, India',
      meta: {
        property: {
          'title': 'About Us | MediaCannibal    | Bangalore, India',
           'description': 'MediaCannibal    – Manufacturers of 5-axis CNC   and 3D Printers.',
          }
      }
    };

    return (
      <div className="page page--about">
        {/* <Helmet>
        <title>About Us | MediaCannibal    | Bangalore, India</title>
        <meta name="description" content="MediaCannibal    – Manufacturers of 5-axis CNC   and 3D Printers."/>
        </Helmet> */}
        <DocumentMeta {...meta} />

        <PageBanner heading={"Know about MediaCannibal   "} subHeading={"Who are we and what do we do?"} classValue={'page-banner--about'}/>
        <section className="section section--about-us">
          <div className="container">
            <SectionHeading classValue={'u-margin-bottom-big u-text-center'} name={'About MediaCannibal   '}/>
            <AboutUs />
          </div>
        </section>
        <section className="section section--journey section--background-fill">
          <div className="container">
            <SectionHeading classValue={'u-margin-bottom-big u-text-center u-text-white'} name={'The MediaCannibal  Journey'}/>
            <LazyLoad height={200} offset={100} once>
            <EtherealJourney />
            </LazyLoad>
          </div>
        </section>
        {/* <section className="section section--team">
          <div className="container">
            <SectionHeading classValue={'u-margin-bottom-big u-text-center'} name={'Meet our team'}/>
            <LazyLoad height={200} offset={100} once>
              <Team team={this.props.teamItems} loading={this.state.loadingContent}/>
            </LazyLoad>
          </div>
        </section> */}
        {/*<section className="section section--contact-us">
          <div className="container">
            <SectionHeading name={"Contact Us"} classValue={"u-margin-bottom-big u-text-center"} />
            <LazyLoad height={200} offset={100} once>
              <ContactUsBanner
                firstText={"We are waiting to address your query."}
                secondText={"Contact us today."}
              />
            </LazyLoad>
          </div>
      </section> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstRun: state.team.firstRun,
    teamItems: state.team.teamItems
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateFirstRun: (firstRun) => {
      dispatch({
        type: actionType.UPDATE_FIRST_RUN_TEAM,
        value: firstRun
      });
    },
    onUpdateTeamItems: (teamItems) => {
      dispatch({
        type: actionType.UPDATE_TEAM_ITEMS,
        value: teamItems
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);