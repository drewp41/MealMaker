import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

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
          <BaseRouter {...this.props} />
          {/* </NewLayout> */}
        </Router>
      </div>
    );
  }
}

// turns the state into a prop so we can use it in our application
const mapStateToProps = state => {
  console.log(state);
  return {
    isAuthenticated: state.token !== null,
    type: state.type
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

