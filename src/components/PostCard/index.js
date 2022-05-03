import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';


import './index.css'

import { PostList } from '../PostList';
import api from '../../utils/Api';


export const PostCard = ({ itemPost, isInFavorites, setFavorites, user, setPostList }) => {
  const [open, setOpen] = useState(false);

  //console.log(isInFavorites);
  const likesCount = itemPost.likes

  const writeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key)) || [];
    storage.push(value);
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const removeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key));
    const filteredStorage = storage.filter((itemID) => value !== itemID);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };


  const addFavorite = () => {
    writeLS('favorites', itemPost._id);
    setFavorites((prevState) => [...prevState, itemPost._id])
    api.addLike(itemPost._id)
      .then((addedItem) => {
        alert(`${addedItem.title} добавлен в избраное`);
      })
      .catch(() => {
        alert('Не удалось добавить');
      });
  }

  const removeFavorite = () => {
    removeLS('favorites', itemPost._id);
    setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID))
    api.deleteLike(itemPost._id)
      .then((removedItem) => {
        alert(`${removedItem.title} удален из избраного`);
      })
      .catch(() => {
        alert('Не удалось удалить');
      });
  }

  const removePost = () => {
    setPostList((prevState) => prevState.filter((item) => itemPost._id !== item._id));
    api.deletePost(itemPost._id);
    setOpen(false);

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let isAuthor = false;
  if (itemPost.author !== null) {
    if (itemPost.author._id == user._id) {
      isAuthor = true;
    }
  }

  return (
    <Card sx={{ maxWidth: 400, minWidth: 400 }} className='post_card'>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={itemPost.author ? itemPost.author.avatar : ''} />
        }
        title={itemPost.author.name}
        subheader={itemPost.author.about}
      />
      <CardMedia
        component="img"
        height="194"
        image={itemPost.image}
        alt="Paella dish"
      />
    
      <CardContent className='card_content'>
        <Typography variant="OVERLINE" paragraph>
          {itemPost.tags}
        </Typography>

        <Button>
          <Link to={`posts/${itemPost._id}`}> {itemPost.title}</Link></Button>

      </CardContent>

      <CardContent className='card_text'>
        <Typography paragraph>
          {itemPost.text}
        </Typography>
        <Typography color="text.secondary">{dayjs(itemPost.created_at).format('MMMM D, YYYY')}</Typography>
      </CardContent>

      <CardActions disableSpacing className='like'>
        {isInFavorites ? (
          <IconButton aria-label="add to favorites" size="small" onClick={removeFavorite}>
            <FavoriteIcon color="error" />
            {likesCount.length}
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites" size="small" onClick={addFavorite}>
            <FavoriteBorderOutlinedIcon />
            {likesCount.length}
          </IconButton>
        )}
        
        {isAuthor ? (<Button onClick={handleClickOpen}>Удалить</Button>) : ('')}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Удаление"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы действительно хотите удалить этот пост?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Нет</Button>
            <Button onClick={removePost} autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}