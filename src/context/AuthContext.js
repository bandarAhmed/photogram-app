import React, { createContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences';

// create context to use  here u wnat
export const AuthContext  = createContext();

function AuthContextProvider(props) {

    const [jwt , setJwt] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const [postId, setPostId] = useState()

    useEffect(()=>{
        getAuthenticated()
    },[])
    
    const getAuthenticated = async () => {
        try {
            const accessToken = await Preferences.get({key: 'accessToken'})
            if(accessToken.value){
                setJwt(accessToken.value)
                setLoggedIn(true)
            }else{
                setLoggedIn(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <AuthContext.Provider value={{jwt, setJwt, loggedIn, setLoggedIn, postId ,setPostId}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider