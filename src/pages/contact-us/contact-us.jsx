 

import React, { Component } from 'react';
// import { Helmet } from "react-helmet";
import DocumentMeta from 'react-document-meta';

import './contact-us.css';

import PageBanner from '../../components/ui/page-banner/page-banner';
import SectionHeading from '../../components/pages-component/section-heading/section-heading';
import ContactUsForm from './components/contact-us-form/contact-us-form';
import Modal from '../../components/ui/modal/modal';
import FormSuccessMsg from '../../components/pages-component/form-success-msg/form-success-msg';

import postGeneralQuery from '../../services/api/post-general-query';
import postMediaQuery from '../../services/api/post-media-query';
import postDistributorQuery from '../../services/api/post-distributor-query';
import getQueryReport from '../../services/api/get-queries-report'
import * as utilityFunctions from '../../utility-functions/utility-functions';
import { connect } from 'react-redux';

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.formData = new FormData();
    this.natureOfQuery = null;
    this.isStateRequired = false;
    this.allowStateField = false;
  }

  state = {
    formValid: true,
    errorMsg: null,
    formSubmissionStart: false,
    showModal: false
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClearningFormData = () => {
    this.formData.delete('name');
    this.formData.delete('email');
    this.formData.delete('contact_number');
    this.formData.delete('message');
    this.formData.delete('region');
    this.formData.delete('state');
  }

  resetProperties = () => {
    this.natureOfQuery = null;
    this.isStateRequired = false;
    this.allowStateField = false;
  }

  onSubmitCallBack = (data) => {
    if (data.status === 201) {
      document.querySelector(".form--contact-us").reset();
      this.onClearningFormData();
      this.resetProperties();
      utilityFunctions.clearSelectField('.select-input');
      this.setState({
        ...this.state,
        formValid: true,
        errorMsg: null,
        formSubmissionStart: false,
        showModal: true
      });
    } else {
      if (data.response) {
        // console.log(data.response.data);
        this.setState({
          ...this.state,
          formValid: false,
          errorMsg: data.response.data,
          formSubmissionStart: false
        });
        // console.log(this.natureOfQuery);
      } else {
        const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
        this.setState({
          ...this.state,
          formValid: false,
          errorMsg: genericErrorMsg,
          formSubmissionStart: false
        });
      }
    }
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      formSubmissionStart: true
    });

    switch (this.natureOfQuery) {
      case 'General Queries':
        postGeneralQuery(this.onSubmitCallBack, this.formData);
        break;
      case 'Become a reseller or distributor':
        postDistributorQuery(this.onSubmitCallBack, this.formData);
        break;
      case 'Media Queries':
        postMediaQuery(this.onSubmitCallBack, this.formData);
        break;
    
      default:
        alert('Something is wrong. Please try again.');
        this.setState({
          ...this.state,
          formSubmissionStart: false
        });
        break;
    }
  }

  onInputChange = (event) => {
    const inputFieldName = event.target.name;
    const targetValue = event.target.value;
    const targetType = event.target.type;
    switch (targetType) {
      case 'text':
        if (inputFieldName === 'name') {
          this.formData.delete('name');
          this.formData.append('name', targetValue);
        } 
        else 
        if (inputFieldName === 'contact_number') {
          const contactNo = targetValue;
          this.formData.delete('contact_number');
          this.formData.append('contact_number', contactNo);
        }
        break;

      case 'email':
        if (inputFieldName === 'email') {
          this.formData.delete('email');
          this.formData.append('email', targetValue);
        }
        break;

      case 'select-one':
        if (inputFieldName === 'natureOfQuery') {
          this.natureOfQuery = targetValue;
          if (targetValue === 'General Queries') {
            this.allowStateField = true;
          } else {
            this.allowStateField = false;
            this.isStateRequired = false;
          }
          // console.log('allowStateField', this.allowStateField, 'isStateRequired', this.isStateRequired);
        } else if (inputFieldName === 'region') {
            this.formData.append('region', targetValue);
            if (targetValue.toLowerCase() === 'india' && this.allowStateField === true) {
              this.isStateRequired = true;
              // console.log('allowStateField', this.allowStateField, 'isStateRequired', this.isStateRequired);
            } else {
              this.isStateRequired = false
              // console.log('allowStateField', this.allowStateField, 'isStateRequired', this.isStateRequired);
            }
        } else if (inputFieldName === 'state') {
          this.formData.append('state', targetValue);
        }
        break;

      case 'textarea':
        
        this.formData.delete('message');
        this.formData.append('message', targetValue);
        break;

      default:
        break;
    }

    this.setState({
      ...this.state,
      formData: this.formData,
    });
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  }

  queryReport = () => {
    getQueryReport()
  }
  render() {
    const meta = {
      title: 'Contact us | MediaCannibal   -Bangalore, India.',
      meta: {
        property: {
          'title': 'Contact us | MediaCannibal   -Bangalore, India.',
           'description': ' MediaCannibal    – get in touch with us.',
          }
      }
    };
    return (
      <React.Fragment>
        <Modal show={this.state.showModal} clicked={this.closeModal}>
          <FormSuccessMsg />
        </Modal>
        <div className="page page--contact-us">
        {/* <Helmet>
        <title>Contact us | MediaCannibal   -Bangalore, India.</title>
        <meta name="description" content="MediaCannibal    – get in touch with us."/>
        </Helmet> */}

<DocumentMeta {...meta} />
          <PageBanner heading={"Get in touch with MediaCannibal   "} subHeading={"Let's talk."} classValue={"page-banner--contact-us"} />
          <section className="section section--contact-us-form">
            <div className="container">
            {
                this.props.session.session
                ?
                    <div>
                      <button className="form-btn" onClick={this.queryReport}>Query Report</button>
                    </div>
                    
                :
                    null
              }
              <SectionHeading name={"Quick Enquiry form"} classValue={"u-margin-bottom-big u-text-center"} hasSubHeading subHeading={"Please fill your details to get in touch with us."}/>
              <ContactUsForm onInputChange={this.onInputChange} onSubmitHandler={this.onSubmitHandler} formSubmissionStart={this.state.formSubmissionStart} errorMsg={this.state.errorMsg} natureOfQuery={this.natureOfQuery} isStateRequired={this.isStateRequired} showLoader={this.state.formSubmissionStart}/>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    session: state.login
  }
}

export default connect(mapStateToProps)(ContactUs);