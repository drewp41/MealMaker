import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
// import CustomLayout from './containers/Layout';
import NewLayout from './containers/newLayout';
import * as actions from './store/actions/auth';

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
        <Router>
          <NewLayout {...this.props}>
            <BaseRouter />
          </NewLayout>
        </Router>
      </div>
    );
  }
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
