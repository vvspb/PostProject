import React from 'react'



import { Grid } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export const Info = ({ name, about, avatar }) => {
    const navigate = useNavigate()
    return (
        <div>
            <Grid container flexDirection='row' margin='30px' alignItems='center'>
               
               <Grid item xs={6}>
                    {name} 
                 
                </Grid>
                <Grid item xs={6}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" onClick={() => navigate('/')}>
                        Home
                    </Link>
                    <Link underline="hover" href="https://github.com/vvspb">
                        GitHub
                    </Link>
                </Breadcrumbs>
                </Grid>
            </Grid>
            <div>
               
            </div>
        </div>
    )
}
