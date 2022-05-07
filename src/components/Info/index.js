import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/userContext';

import { Grid, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button } from '../Button';
import FormModal from '../FormModal';

import './index.css'



export const Info = ({ name, about, avatar }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);


    const navigateToEditPage = () => {
        navigate('user/edit');
    };

    const handleClickSignUp = () => {

        localStorage.removeItem('token');
        location.reload(true);
    }

    return (
        <div className='info'>

            <div >
                <Grid container flexDirection='row' maxWidth={{ sm: 200 }}>
                    <Grid item container spacing={1} alignItems='center'>
                        <Grid item>
                            <Chip icon={<AssignmentIndIcon />} onClick={handleClickSignUp} label='SignUp/ SignIn' color='info' variant='outlined' />
                        </Grid>
                        <Grid item container>
                            <Chip icon={<FaceIcon />} onClick={navigateToEditPage} label={user.name ? user.name : 'user'} color='info' variant='outlined' />
                        </Grid>

                    </Grid>

                </Grid>
            </div>
            <div>
            <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" onClick={() => navigate('/')}>
                        Home
                        </Link>
                        <Link underline="hover" href="https://github.com/vvspb/PostProject.git">
                        GitHub
                        </Link>
                    </Breadcrumbs>
            </div>
        </div>
    )
}
