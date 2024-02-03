
import React, { useContext, useEffect, useState } from 'react';
import './header.css'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Storage } from '@capacitor/storage';
import axios from 'axios';
import avatar2 from '../../AvatarImage/avatar2.png'

function Headers() {
  const [img, setImg] = useState('');
  const {  jwt, loggedIn } = useContext(AuthContext);

  const history = useHistory();

  useEffect(()=>{
    gitImage()
  },[img]);

  const gitImage = async ()=> {
    try {
      await axios.get('http://localhost:4000/get-my-post',
      {
          headers: {
              Authorization: jwt
          }
      }).then(res=> setImg(res.data.data[0].author.avatar))
      
    } catch (e) {
      console.log(e)
    }
  };
 
  const logOut = async ()=> {
    await Storage.remove({
      key: 'accessToken'
    })
    await history.push('/login')
  }
  return (
    <>
      <div className='header-contaier'>
        <p className='appName'><a href='/get-all-post'>Photogram</a></p>
        {
          img ? <img className='HeaderImg' onClick={()=> history.push('/account/update')}  src={img} />
          :
          <img className='HeaderImg' onClick={()=> history.push('/account/update')}  src={avatar2} />

        }
        <div className='ulheader'>
          <ul>
            <div className='margin-betweent'>
              <li>
                <i className="fa-regular fa-square-plus"></i>
                <a  href='/post'>Add</a>
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
                  <a onClick={()=> logOut()}>Log out</a>
                </li>
              </div>
            }
              
          </ul>
        </div>
      </div>
    </>
  )
}

export default Headers