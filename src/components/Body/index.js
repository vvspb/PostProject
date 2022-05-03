import React, { useState, useEffect } from 'react';
import { HeadField } from '../HeadField';
import { PostList } from '../PostList';

import api from '../../utils/Api';

import Pagination from '@mui/material/Pagination';

import './index.css'

export const Body = ({ user }) => {
    const [postList, setPostList] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorite')) || [])
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        api.getPosts()
            .then((data) => data.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); }))
            .then((data) => {
                setPageCount(Math.ceil(data.length / 12));
                setPostList(data.slice(12 * (page - 1), 12 * (page - 1) + 12))
            });
    }, [page, favorites]);

    return (
        <div>
            <HeadField />
            <PostList
                list={postList}
                favorites={favorites}
                setFavorites={setFavorites}
                user={user}
                setPostList = {setPostList}
            />
            <Pagination sx={{ mb: 3, mt: 3, ml: 45 }}
                count={pageCount}
                page={page}
                onChange={(_, number) => setPage(number)}
            />
        </div>
    )
}
