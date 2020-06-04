import React, { useEffect } from 'react';
import { BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import BaseRouter from './routes';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
// import CustomLayout from './containers/Layout';
import Home from './containers/Home';
import ScrollToTop from './components/ScrollToTop';
import * as actions from './store/actions/auth';

// Create history object.
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

// Listen to history changes.
// You can unlisten by calling the constant (`unlisten()`).
const unlisten = history.listen((location, action) => {
  console.log(action, location.pathname, location.state);
});

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    console.log('yooo');
  }, [location]);
}



const App = (props) => {

  // const history = useHistory();
  // useEffect(() => {
  //   console.log('in here');
  // }, [history.location.pathname]);
  // usePageViews()

  // unmount
  useEffect(() => {
    return () => {
      props.onTryAutoSignup();
    }
  }, [])

  return (
    // <div>
    //   <Router>
    //     <CustomLayout {...this.props}>
    //       <BaseRouter />
    //     </CustomLayout>
    //   </Router>
    // </div>
    <div>
      <Router history={history}>
        <ScrollToTop />
        {/* <NewLayout {...this.props}> */}
        <BaseRouter {...props} />
        {/* </NewLayout> */}
      </Router>
    </div>
  );
}

// turns the state into a prop so we can use it in our application
const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

// automatic authentication check 
// every time the app is rendered, the app will check if we are authenticated
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
