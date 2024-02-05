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
          <Route path='/post/get-post'>
            <PostImg />
          </Route>
          <Route path='/register'>
          {
            !loggedIn ? 
            <Register />
             : <Redirect to='/account/update'/>
          }
          </Route>
          <Route path='/update/post'>
            <UpdatePost/>
          </Route>
          <Route path='/get-all-post'>
            <Headers />
            <Allpost />
          </Route>
          <Route path='/post'>
            <Headers />
            <AddNewPost />
          </Route>
          <Route path='/account/update'>
            {
              loggedIn ? <EditProfile /> : <Redirect to='/login' />
            }
          </Route>
            {
              loggedIn ? <Redirect to='/get-all-post' /> : <Route path='/login'><Login /></Route>
            }
        </Switch>
      </Router>
    </AuthContextProvider>

  );
}

export default App;
