
import React, { useContext, useEffect, useState } from 'react';
import './header.css'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import avatar2 from '../../AvatarImage/avatar2.png'
import { CircularProgress } from '@mui/material';
import { url } from '../../config/url';

function Headers() {
  const [img, setImg] = useState();
  const [loading, setLoading]= useState(false);

  
  const { jwt, loggedIn } = useContext(AuthContext);

  const history = useHistory();


  useEffect(() => {
    gitImage()
  }, [jwt]);

  const gitImage = async () => {
    try {
      await axios.get(url + 'getUserId', {
        headers: {
          Authorization: jwt
        }
      }).then(res=> setImg(res.data.avatar))
    } catch (e) {
    }
  };

  const logOut = async () => {
    setLoading(true);
    await Preferences.remove({
      key: 'accessToken'
    });
    history.push('/get-all-post');
    window.location.reload();
    setLoading(false);
  };
  return (
    <>
    {
      loading ? <CircularProgress  size={70}/> :
      <>
      <div className='header-contaier'>
        <p className='appName'><a href='/get-all-post'>Photogram</a></p>
        {
          img ? <img className='HeaderImg' onClick={() => history.push('/account/update')} src={img} />
            :
            <img className='HeaderImg' onClick={() => history.push('/account/update')} src={avatar2} />

        }
        <div className='ulheader'>
          <ul>
            <div className='margin-betweent'>
              <li>
                <i className="fa-regular fa-square-plus"></i>
                <a href='/post'>Add</a>
              </li>
            </div>
            <div className='margin-betweent'>
              <li>
                <i className="fa-solid fa-magnifying-glass"></i>
                <a href='/get-all-post'>Posts</a>
              </li>
            </div>
            {
              !loggedIn ?
                <div className='margin-betweent'>
                  <li>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <a href='/login'>Login</a>
                  </li>
                </div>
                :
                <div className='btnOut'>
                  <li >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <a onClick={logOut}>Log out</a>
                  </li>
                </div>
            }

          </ul>
        </div>
      </div>
      </>
    }
    </>
  )
}

export default Headers