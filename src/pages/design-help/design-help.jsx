 

import React, { Component } from 'react';
// import { Helmet } from "react-helmet";
import DocumentMeta from 'react-document-meta';

import './design-help.css';

import PageBanner from '../../components/ui/page-banner/page-banner';
import SectionHeading from '../../components/pages-component/section-heading/section-heading';
import DesignHelpForm from './components/design-help-form/design-help-form';
import Modal from '../../components/ui/modal/modal';
import FormSuccessMsg from '../../components/pages-component/form-success-msg/form-success-msg';
import DigitalHelp from '../../services/api/post-DigitalHelp-query';
import getQueryReport from '../../services/api/get-queries-report'
import * as utilityFunctions from '../../utility-functions/utility-functions';
import { connect } from 'react-redux';

class DesignHelp extends Component {
  constructor(props) {
    super(props);
    this.formData = new FormData(); 
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
    this.formData.delete('country');
    this.formData.delete('contact_number');
    this.formData.delete('email');
    this.formData.delete('imageLink');
    this.formData.delete('message');
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
    DigitalHelp(this.onSubmitCallBack, this.formData);
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
          this.formData.delete('contact_number');
          this.formData.append('contact_number', targetValue);
        }
        else 
        if (inputFieldName === 'email') {
          this.formData.delete('email');
          this.formData.append('email', targetValue);
        }
        else 
        if (inputFieldName === 'country') { 
          this.formData.delete('country');
          this.formData.append('country',targetValue);
        }
        else 
        if (inputFieldName === 'imageLink') { 
          this.formData.delete('imageLink');
          this.formData.append('imageLink',targetValue);
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
      title: 'MediaCannibal    - CAD/CAM Design or Programming Help',
      meta: {
        property: {
          'title': 'MediaCannibal    - CAD/CAM Design or Programming Help',
           'description': 'MediaCannibal    is glad to assist you with CAD/CAM programming for CNC machining and 3D Printing.',
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
        <title>Design Help | MediaCannibal   -Bangalore, India.</title>
        <meta name="description" content="MediaCannibal    – get in touch with us."/>
        </Helmet> */}

        <DocumentMeta {...meta} />
          <PageBanner heading={"NEED HELP WITH CAD/CAM PROGRAMMING?"} subHeading={"Get In Touch"} classValue={"page-banner--design-help"} />
          <section className="section section--design-help-form">
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
              <SectionHeading name={"Details form"} classValue={"u-margin-bottom-big u-text-center"} hasSubHeading subHeading={"We'd Love to hear about your Project and Help you get started"}/>
              <DesignHelpForm onInputChange={this.onInputChange} onSubmitHandler={this.onSubmitHandler} formSubmissionStart={this.state.formSubmissionStart} errorMsg={this.state.errorMsg} natureOfQuery={this.natureOfQuery} isStateRequired={this.isStateRequired} showLoader={this.state.formSubmissionStart}/>
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

export default connect(mapStateToProps)(DesignHelp);