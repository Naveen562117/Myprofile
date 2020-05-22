 

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import loader from '../assets/images/loader/loader.gif';

const Loading = () => {
  return (
    <div className="page">
      <div className="page-loader u-text-center">
        <img src={loader} alt="Loader" height="100"/>
        <p className="u-text-center">LOADING...</p>
      </div>
    </div>
  );
};

const Home = Loadable({
  loader: () => import('../pages/home/home'),
  loading: Loading
});
const Halo = Loadable({
  loader: () => import('../pages/products/ethereal-halo/ethereal-halo.jsx'),
  loading: Loading
});
const Ray = Loadable({
  loader: () => import('../pages/products/ethereal-ray/ethereal-ray.jsx'),
  loading: Loading
});
const Pentagram = Loadable({
  loader: () => import('../pages/products/ethereal-pentagram/ethereal-pentagram.jsx'),
  loading: Loading
});
const Concrete = Loadable({
  loader: () => import('../pages/products/ethereal-concrete/ethereal-concrete'),
  loading: Loading
})
const About = Loadable({
  loader: () => import('../pages/about/about'),
  loading: Loading
});
const Media = Loadable({
  loader: () => import('../pages/media/media'),
  loading: Loading
});
const Careers = Loadable({
  loader: () => import('../pages/careers/careers'),
  loading: Loading
});
const Apply = Loadable({
  loader: () => import('../pages/careers/components/apply/apply.jsx'),
  loading: Loading
})
const ContactUs = Loadable({
  loader: () => import('../pages/contact-us/contact-us'),
  loading: Loading
});
const DesignHelp = Loadable({
  loader: () => import('../pages/design-help/design-help'),
  loading: Loading
});
const Blogs = Loadable({
  loader: () => import('../pages/blogs/blog'),
  loading: Loading
});
const BlogPage = Loadable({
  loader: () => import('../pages/blogs/components/blog-page/blog-page'),
  loading: Loading
})
const BlogsCreate = Loadable({
  loader: () => import('../pages/blogs/components/create-blog/create-blog'),
  loading: Loading
})
const BlogsEditor = Loadable({
  loader: () => import('../pages/blogs/components/create-blog/blog-content-editor/blog-editor'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('../pages/login/login'),
  loading: Loading
});
const Dashboard = Loadable({
  loader: () => import('../pages/dashboard/dashboard'),
  loading: Loading
})
const ErrorPage = Loadable({
  loader: () => import('../pages/error-page/error-page'),
  loading: Loading
});

class Routes extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <Switch>
          <Route path="/error-page" component={ErrorPage}/>
          <Route path="/about" component={About} />
          <Route path="/media" component={Media} />
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" render={() => (
              !sessionStorage.jwt ? (
                <Redirect to="/" />
              ) : (
                <Dashboard />
              )
            )}
          />
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/blogs/blog/:id" exact component={BlogPage} />
          <Route path="/blogs/create" exact render={() => (
              !sessionStorage.jwt ? (
                <Redirect to="/" />
              ) : (
                <BlogsCreate />
              )
            )} />
          <Route path="/blogs/create/content/:id" render={() => (
              !sessionStorage.jwt ? (
                <Redirect to="/" />
              ) : (
                <BlogsEditor />
              )
            )} />
          <Route path="/products/halo" component={Halo} />
          <Route path="/products/ray" component={Ray} />
          <Route path="/products/pentagram" component={Pentagram} />
          <Route path="/products/concrete" component={Concrete} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/DesignHelp" component={DesignHelp} />
          <Route path="/careers" exact component={Careers} />
          <Route path="/careers/apply/:id" component={Apply} />
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={Home} />
          <Redirect to="/error-page" />
        </Switch>
    );
  }
}


export default Routes;
