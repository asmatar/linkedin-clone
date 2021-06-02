import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { getUserAuth } from './redux/actions';

function App({getUserAuth}) {

  useEffect(() => {
    getUserAuth();
  }, [])
  
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Login />   
            </Route>
            <Route exact path='/home'>
              <Header />
              <Home />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    
  }
}
const mapDisatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(getUserAuth())
  }
}
export default connect(mapStateToProps, mapDisatchToProps )(App);
