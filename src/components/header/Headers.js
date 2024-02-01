
import React, { useContext } from 'react';
import './header.css'
import imgas from '../images/Annotation 2024-01-23 201729.png';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Headers() {

  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();
  
  return (
    <>
      <div className='header-contaier'>
        <p className='appName'><a href='/get-all-post'>Photogram</a></p>
        <img className='HeaderImg' onClick={()=> history.push('/account/update')} alt='Error' src={imgas} />
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
                : ''
            }

          </ul>
        </div>
      </div>
    </>
  )
}

export default Headers