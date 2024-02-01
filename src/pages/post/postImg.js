import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { Storage } from '@capacitor/storage';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import imagess from '../../components/images/Annotation 2024-01-23 201729.png';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './postImg.css'
import Allpost from '../allposts/Allpost';

function PostImg() {

    const [title, setTitle] = useState('');
    const [discraption, setDiscraption] = useState('');
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [avatar, setAvatr] = useState('');
    // const [dalog, setDalog] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [like, setLike] = useState();

    const history = useHistory();
    const { jwt, postId } = useContext(AuthContext);


    useEffect(() => {
        getData()

    }, []);

    
    const PostLike = async () => {
        const Like = { like: true }

        try {
            const like = await axios.post(`http://localhost:4000/post/${postId}/like`, Like, {
                headers: {
                    Authorization: jwt
                }
            })
            const responseData = JSON.parse(like.config.data);
            console.log(responseData.like);
            responseData.like ? setLike(true) : setLike(false);



        } catch (e) {
            console.log(e)
        }
    }


    const getData = async () => {
        try {
            // setLoading(true)
            const posts = await axios.get(`http://localhost:4000/post/${postId}/get-post`)
            setName(posts.data.data.author.name)
            setImages(posts.data.data.img)
            setAvatr(posts.data.data.author.avatar)
            setDiscraption(posts.data.data.discraption)
            setTitle(posts.data.data.title)
            // setLoading(false)
        } catch (e) {
            console.log(e)
            // setLoading(false)
        }
    }

    return (
        <>
            <div className='background'>
                <div className='nav-card'>

                    <CardHeader
                        avatar={
                            <Avatar src={avatar} aria-label="recipe"></Avatar>
                        }
                        fontSize={'30px'}
                        title={name}
                    />
                </div>
                <Card sx={{ width: '100%', marginRight: "100px", marginLeft: "100px", marginTop: '72px', maxHeight: 'auto', background: "black", color: 'white', border: '1px white solid' }}>
                    <CardMedia

                        style={{ width: "100%", objectFit: 'fill' }}
                        component="img"
                        height="720"
                        image={images}
                        alt="Error"
                    />
                    <CardActions disableSpacing>
                        <IconButton onClick={() => PostLike()} aria-label="like">
                            {
                                like ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteIcon style={{ color: 'white' }} />
                            }
                        </IconButton>
                    </CardActions>
                    <CardContent>
                        <Typography variant="h6" fontSize={'30px'} color="blcak">
                            {title}
                        </Typography>
                    </CardContent>
                    <CardContent style={{ whiteSpace: 'pre-line' }}>
                        <Typography variant="body1" fontSize={'30px'}>
                            {discraption}
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default PostImg