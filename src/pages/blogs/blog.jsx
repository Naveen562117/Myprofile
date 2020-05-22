import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload';
import Spinner from '../../components/ui/spinner/spinner';
import * as actionType from '../../store/actions/action-type'
import getBlogs from '../../services/api/get-blog-items'
// import { Helmet } from "react-helmet";
import DocumentMeta from 'react-document-meta';

// importing UI component used
import SectionHeading from '../../components/pages-component/section-heading/section-heading'
import PageBanner from '../../components/ui/page-banner/page-banner';
import '../../components/pages-component/button/button.css'
import BlogItem from './components/blog-item/blog-item'
import deleteBlog from '../../services/api/delete-blog'
import pubunpubBlogs from '../../services/api/blog-unpublish'
import Modal from '../../components/ui/modal/modal'
import ShowMsg from '../../components/pages-component/showMSG/msg'

class Blogs extends Component{
  state = {
    showModal: false,
    msg:false,
    msgContent:'',
    attention:false
  }

  blogsCallback = (data) => {
    if(data.status === 200){
      this.props.fetchBlogs(data.data)
    }
  }

  componentDidMount(){
    window.scrollTo(0,0);
    getBlogs(this.blogsCallback)
  }

  
  unPublishCallback = (data) => {
    if(data.status === 200){
      this.setState({
        msg:true,
        msgContent: 'Successfully Changed',
        showModal: true,
        attention:false
      })
    }else{
      this.setState({
        msg:true,
        msgContent: 'Something Went Wrong',
        showModal: true,
        attention:true
      })
    }
  };
  
  publishBlog = (id) => {
    const data = {
      id: id,
      publish: true
    }
    pubunpubBlogs(this.unPublishCallback,id,{publish:true})
    this.props.pubunpubBlog(data)
  };
  unpublishBlog = (id) => {
    const data = {
      id: id,
      publish: false
    }
    pubunpubBlogs(this.unPublishCallback,id,{publish:false})
    this.props.pubunpubBlog(data)
  };
  deleteBlogCallback = (data) => {
    if(data.status === 204){
      this.setState({
        msg:true,
        msgContent: 'Successfully Deleted',
        showModal: true,
        attention: false
      })
    }else{
      this.setState({
        msg:true,
        msgContent: 'Something Went Wrong',
        showModal: true,
        attention: true
      })
    }
  };
  deleteBlog = (id) => {
    deleteBlog(this.deleteJobCallback,id)
    this.props.deleteBlog(id)
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false,
      attention: false,
      msg:false,
      msgContent:''
    });
  };


  render(){
    const blogsItem = this.props.blog.blogItems.map((item) => {
      return (
        <LazyLoad height={200} offset={100} placeholder={<Spinner />} once key={item.id}>
          <BlogItem
            title={item.title}
            date={item.created_at}
            id={item.id}
            imgUrl={item.thumbnail}
            publish={item.publish}
            publishBlog={this.publishBlog} 
            unpublishBlog={this.unpublishBlog}
            deleteBlog = {this.deleteBlog}
            session = {this.props.session.session}
          />
        </LazyLoad>
      );
    });

    const meta = {
      title: 'Blogs – CNC Machine,3D printer |MediaCannibal   -Bangalore, India.',
      meta: {
        property: {
          'title': 'CNC Machine,3D printer |MediaCannibal   -Bangalore, India.',
           'description': 'MediaCannibal    – Blogs: simultaneous 5-axis CNC Machine & 3D Printer.',
          }
      }
    };

      return (
          <div className="page page--blogs-page">
            {/* <Helmet>
            <title>Blogs – CNC Machine,3D printer |MediaCannibal   -Bangalore, India.</title>
            <meta name="description" content="MediaCannibal    – Blogs: simultaneous 5-axis CNC Machine & 3D Printer."/>
            </Helmet> */}
            <DocumentMeta {...meta} />
            {
              this.state.msg
              ?
              <Modal show={this.state.showModal} clicked={this.closeModal}>
                <ShowMsg msg={this.state.msgContent} attention={this.state.attention}/>
              </Modal>
              : null
            }
            <PageBanner heading={'MediaCannibal    Blogs'} subHeading={'Dream | Design | Create'} classValue={'page-banner--blogs-page'}/>
            <section className="section section--blogs">
              <div className="container">
                {
                  this.props.session.session
                  ?
                    <Link to="/blogs/create">
                      <button className="form-btn">Create blog</button>
                    </Link>
                  :
                      null
                }
                <SectionHeading name={"Featured Blogs"} classValue={"u-margin-bottom-big u-text-center"}/>
                <div className="blog-item-container three-col-layout">
                  {  blogsItem  }
                </div>
              </div>
            </section>
          </div>
        );
  }
}

const mapStateToProps = (state) =>{
  return{
    session: state.login,
    blog: state.blog
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchBlogs: (data) => {
      dispatch({
        type: actionType.BLOG_ITEM,
        value: data
      })
    },
    pubunpubBlog: (data) => {
      dispatch({
        type: actionType.UNPUBLISHED_BLOG,
        value: data
      });
    },
    deleteBlog: (data) => {
      dispatch({
        type: actionType.DELETE_BLOG,
        value: data
      });
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Blogs)