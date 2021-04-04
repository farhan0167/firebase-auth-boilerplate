import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/Signup'
import {AuthProvider} from './contexts/AuthContext'
import UserProfile from './components/UserProfile'
import UpdateProfile from './components/Profiles/UpdateProfileUser'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'


class App extends Component {
  render() {
    return (
      <React.Fragment>

        <Router>
          <Switch>
            <Route exact path = "/" component = {Home}/>
            <AuthProvider>
              <Route path = "/signup" component = {SignUp}/>
              <Route path = "/login" component = {Login}/>
              <PrivateRoute path = "/profile" component = {UserProfile}/>
              <PrivateRoute path = "/profile-update" component = {UpdateProfile}/>
            </AuthProvider>
          </Switch>
        </Router>
      </React.Fragment>

    );
  }
}

export default App;
