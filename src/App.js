import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Login from './Login.js';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import HeaderLoggedOut from './HeaderLoggedOut';
import Register from './Register';
import Seller from './Seller';
import SidebarWindow from './SidebarWindow';
import SidebarWithChat from './SidebarWithChat';
import MyPosting from './MyPosting';
import PostView from './PostView';
import MyFavorites from './MyFavorites';

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser){
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          {!user ? (
            <Route path="/postings-view/:postId">   
                <HeaderLoggedOut dark/>
                <PostView />
        
            </Route>
          ) : (
            <Route path="/postings-view/:postId">
                <Header dark />
                <PostView />
          
            </Route>
          )}

          {!user ? (
            <Route path="/my-favorites">
              <Login />
            </Route>
          ) : (
            <Route path="/my-favorites">
              <Header dark/>
              <MyFavorites />
            </Route>
          )}
            
          {!user ? (
            <Route path="/my-postings">
              <Login />
            </Route>
          ) : (
            <Route path="/my-postings">
              <Header dark/>
              <MyPosting />
            </Route>
          )}
          
          {!user ? (
            <Route path="/messages/:roomId">
              <Login />
            </Route>
          ) : (
            <Route path="/messages/:roomId">
              <Header dark/>
              <SidebarWithChat />
            </Route>
          )}

          {!user ? (
            <Route path="/messages">
              <Login />
            </Route>
          ) : (
            <Route path="/messages">
              <div className="newListing__background">
                <Header dark />
                <SidebarWindow />
              </div>
            </Route>
          )}

          {!user ? (
            <Route path="/new-listing">
              <Login />
            </Route>
          ) : (
            <Route path="/new-listing">
              <div className="newListing__background">
                <Header dark />
                <Seller />
              </div>
            </Route>
          )}

          {!user ? (
            <Route path="/">
              <div className="home__background">
                <img src="/Images/Home/image01.jpg" alt = "" />
                <HeaderLoggedOut/>
                <Home />
              </div>
            </Route>
          ) : (
            <Route path="/">
              <div className="home__background">
                <img src="/Images/Home/image01.jpg" alt = "" />
                <Header />
                <Home />
              </div>
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
