import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./App.css";
import { Layout, message } from "antd";
import Home from "./components/pages/home/home";
import Dashboard from "./components/pages/dashboard/dashboard";
import Patients from "./components/pages/patients/patients";
import Resources from "./components/pages/resources/resources";
import Analytics from "./components/pages/Analytics/analytics";
import PrivateRoute from "./components/utils/PrivateRoute";
import Navbar from "./components/layout/navbar/Navbar";
import Login from "./components/pages/login/Login";

const { Content } = Layout;

const App = (props) => {
  useEffect(() => {
    if (props.messages.success.length) {
      props.messages.success.map((msg) => message.success(msg.text));
    }
    if (props.messages.error.length) {
      props.messages.error.map((msg) => message.error(msg.text));
    }
  }, [props.messages]);
  return (
    <div className="App">
      {props.auth.isAuthenticated ? <Navbar /> : ""}
      <Route
        exact
        path="/"
        render={() =>
          props.auth.isAuthenticated ? <Redirect to="/home" /> : <Login />
        }
      />
      <Layout className="container">
        <Content
          className="site-layout-background"
          style={
            props.auth.isAuthenticated
              ? {
                  padding: 24,
                  margin: 0,
                  minHeight: "90vh",
                }
              : {}
          }
        >
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/patients" component={Patients} />
            <PrivateRoute exact path="/resources" component={Resources} />
            <PrivateRoute exact path="/analytics" component={Analytics} />
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

App.propTypes = {
  auth: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages,
});

export default connect(mapStateToProps, {})(App);

// import React, { lazy, Suspense, useEffect } from "react";
// import { Router, Switch, Route, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import history from "./components/utils/history";
// import CircularProgressOverlay from "./components/utils/circular-progress-overlay";
// import Home from "./components/pages/home/home";
// import Dashboard from "./components/pages/dashboard/dashboard";
// import Patients from "./components/pages/patients/patients";
// import Resources from "./components/pages/resources/resources";
// import Analytics from "./components/pages/Analytics/analytics";
// import PrivateRoute from "./components/utils/PrivateRoute";
// import Navbar from "./components/layout/navbar/Navbar";
// import Login from "./components/pages/login/Login";

// import { message } from "antd";

// const App = (props) => {
//   useEffect(() => {
//     if (props.messages.success.length) {
//       props.messages.success.map((msg) => message.success(msg.text));
//     }
//     if (props.messages.error.length) {
//       props.messages.error.map((msg) => message.error(msg.text));
//     }
//   }, [props.messages]);
//   return (
//     <div className="w-100 h-100">
//       <Router history={history}>
//         {props.auth.isAuthenticated ? <Navbar /> : ""}
//         <Route
//           exact
//           path="/"
//           render={() =>
//             props.auth.isAuthenticated ? <Redirect to="/home" /> : <Login />
//           }
//         />
//         <Suspense fallback={<CircularProgressOverlay />}>
//           <Switch>
//             <PrivateRoute exact path="/home" component={Home} />
//             <PrivateRoute exact path="/dashboard" component={Dashboard} />
//             <PrivateRoute exact path="/patients" component={Patients} />
//             <PrivateRoute exact path="/resources" component={Resources} />
//             <PrivateRoute exact path="/analytics" component={Analytics} />
//           </Switch>
//         </Suspense>
//       </Router>
//     </div>
//   );
// };

// App.propTypes = {
//   auth: PropTypes.object.isRequired,
//   messages: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   messages: state.messages,
// });

// export default connect(mapStateToProps, {})(App);
