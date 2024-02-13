import React, { useContext, useEffect, useState } from 'react'
import './Allpost.css'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../context/AuthContext';
import { url } from '../../config/url';

function Allpost() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setPostId } = useContext(AuthContext)

    useEffect(() => {
        getPost()
    }, []);

    const history = useHistory();
    
    const getPost = async () => {
        try {
            setLoading(true)
            const response = await axios.get(url +'get-all-post')
            const SaveToimg = response.data.data.map(item => item.img);
            setImages(SaveToimg)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    const handleClick = async (index)=>{
        const response = await axios.get(url +'get-all-post')
        setPostId(response.data.data[index]._id)
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
                        <div className='fullscrean'>
                            <div className='post-container'>
                                <div className='images'>
                                    {
                                        images.map((img, index) => (
                                            <img onClick={()=> handleClick(index)}  key={index} alt='Error' src={img} />
                                        )).reverse()
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Allpost