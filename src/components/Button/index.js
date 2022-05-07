import React from 'react';
import ButtonMui from '@mui/material/Button';

import { useNavigate, Link } from 'react-router-dom';
import './index.css';

export const ButtonPost = () => {
  const navigate = useNavigate();
  return (
    <div className='button'>
      <ButtonMui 
        variant="contained"
        onClick={() => navigate(`posts/create`)}
      >
        Создать пост
      </ButtonMui>
    </div>
  );
}