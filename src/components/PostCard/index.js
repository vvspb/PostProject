import React, { useState, useContext } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';


import { useLocalStorage } from '../../hooks/useLocalStorage';
import ModalContext from "../../contexts/modalContext"
import UserContext from '../../contexts/userContext';

import './index.css'

import { useApi } from '../../hooks/useApi';
import PostContext from '../../contexts/postContext';


export const PostCard = ({ itemPost, isInFavorites, setFavorites, setPostList }) => {
  const api = useApi();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { writeLS, removeLS } = useLocalStorage();

  const { setModalState } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const { post, setPost } = useContext(PostContext);

  const likesCount = itemPost.likes

  const addFavorite = () => {
    writeLS('favorites', itemPost._id);
    setFavorites((prevState) => [...prevState, itemPost._id])
    api.addLike(itemPost._id)
      .then((addedItem) => {
        setModalState(() => {
          return { isOpen: true, msg: `"${addedItem.title}" добавлен в избраное`, }
        })
      })
      .catch(() => {
        setModalState(() => {
          return { isOpen: true, msg: `не удалось добавить в избранное "${addedItem.title}"`, }
        })
      });
  }

  const removeFavorite = () => {
    removeLS('favorites', itemPost._id);
    setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID))
    api.deleteLike(itemPost._id)
      .then((removedItem) => {
        setModalState(() => {
          return { isOpen: true, msg: `"${removedItem.title}" удален из избраного`, }
        });
      })
      .catch(() => {
        setModalState(() => {
          return { isOpen: true, msg: `не удалось удалить из изборанного "${removedItem.title}" `, }
        });
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
        {isAuthor ? (<Button
          onClick={() => {
            navigate(`/posts/edit/${itemPost._id}`)
            return setPost(itemPost)
          }
          }

        >
          Редактировать
        </Button>) : ('')}


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