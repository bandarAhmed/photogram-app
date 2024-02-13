import "./App.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Headers from './components/header/Headers';
import Login from './pages/login/Login';
import React, { useContext } from 'react';
import Register from './pages/register/register';
import Allpost from "./pages/allposts/Allpost";
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import EditProfile from "./pages/editProfile/EditProfile";
import AddNewPost from "./pages/AddNewPost/AddNewPost";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PostImg from "./pages/post/postImg";
import UpdatePost from "./pages/update/UpdatePost";

function App() {

  const { loggedIn } = useContext(AuthContext)

  return (

    <AuthContextProvider>
      <Router>
        <Switch>
        <Route exact path="/">
              <Redirect to='/login'/>
          </Route>
          <Route exact path='/post/get-post'>
            <Headers />
            <PostImg />
          </Route>
          <Route exact path='/register'>
          {
            !loggedIn ? 
            <Register />
             : <Redirect exact to='/account/update'/>
          }
          </Route>
          <Route exact path='/update/post'>
           <Headers />
            <UpdatePost/>
          </Route>
          <Route exact path='/get-all-post'>
            <Headers />
            <Allpost />
          </Route>
          <Route exact path='/post'>
            <Headers />
            <AddNewPost />
          </Route>
          <Route exact path='/account/update'>
            {
              loggedIn ? <EditProfile /> : <Redirect exact to='/login' />
            }
          </Route>
            {
            loggedIn ? <Redirect exact to='/get-all-post' /> : <Route exact path='/login'><Headers/><Login /></Route>
            }
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
