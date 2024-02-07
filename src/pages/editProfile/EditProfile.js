import React, { useContext, useEffect, useState } from 'react';
import './editProfile.css';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';

function EditProfile() {

    const [password, setPassword] = useState('');
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [avatar, setAvatr] = useState([]);
    const [dalog, setDalog] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const { jwt, setPostId } = useContext(AuthContext);


    useEffect(() => {
        if(jwt){
            getData();
        }
    }, []);


    const updatePro = async () => {
        const data = {
            name,
            password,
        }
        try {
            setDalog(true)
            setLoading(true)
            await axios.put('http://localhost:4000/account/update', data, {
                headers: {
                    Authorization: jwt
                }
            })
            Preferences.remove({
                key: "accessToken"
            })
            history.push('/get-all-post')
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    };

    const handelClose = () => {
        setDalog(false)
    };

    const getData = async () => {
        try {
            setLoading(true)
           const getUserPost = await axios.get('http://localhost:4000/get-my-post',
                {
                    headers: {
                        Authorization: jwt
                    }
                }).then(res=>     
                {   
                    const getPost = res.data.data.map(item => item.img);
                    setImages(getPost);
                })
        if (getUserPost === undefined){
                const getUserData = await axios.get('http://localhost:4000/getUserId',
                {
                    headers: {
                        Authorization: jwt
                    }
                })   
                setName(getUserData.data.name);
                setAvatr(getUserData.data.avatar);
        }
        setLoading(false)
        } catch(e) {
            setLoading(false)
        }
    }

    const handleClick = async (index) => {
        setLoading(true)
        const response = await axios.get('http://localhost:4000/get-all-post')
        setPostId(response.data.data[index]._id)
        setLoading(false)
        history.push('/post/get-post')
    }

    return (
        <>
            {
                loading ? <CircularProgress size={70}
                    sx={{
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2
                    }} />
                    :
                    <>
                        <Dialog
                            open={dalog}
                            keepMounted
                           
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"انت على وشك تعديل بياناتك"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    هل تود المتابعه؟
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handelClose}>لا</Button>
                                <Button onClick={() => history.push('/login')}>موافق</Button>
                            </DialogActions>
                        </Dialog>
                        <div className='edit-profile'>
                        <Button style={{position: 'absolute', right: '1%', top: '3%', fontSize: "40px"}} onClick={() => history.push("/timesheet")}
                    ><i className="fa fa-arrow-circle-o-right"></i></Button>
                            <div className='form'>
                                <img src={avatar} className='edit-img' alt='error' />
                                <div className='edit-form'>
                                    <input placeholder={name} value={name} onChange={(e) => setName(e.target.value)} />
                                    <input placeholder='Edit Password (Required)' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button onClick={updatePro} className='sub-button' type='sumet'>Edit</button>
                            </div>
                        </div>
                        <div className='img-continner'>
                            <div className='img-form'>
                                {
                                    images.map((img, index) => (
                                        <img onClick={() => handleClick(index)} src={img} key={index} />
                                    )).reverse()
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default EditProfile