import React, { useState, useEffect, useContext } from 'react';
import { HeadField } from '../HeadField';
import { PostList } from '../PostList';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import FormModalContext from '../../contexts/formModalConext';
import UserContext from '../../contexts/userContext';

import { useApi } from '../../hooks/useApi';

import Pagination from '@mui/material/Pagination';

import './index.css'

export const Body = () => {
    const api = useApi();
    const { readLS } = useLocalStorage();
    
    const {user} = useContext(UserContext);
    const { setModalFormState } = useContext(FormModalContext);
    const [postList, setPostList] = useState(null);
    const [favorites, setFavorites] = useState(readLS('favorites') || []);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1)

   
    const token = readLS('token');

    useEffect(() => {
        if (!token) {
            setModalFormState(() => {
                return {
                    isOpen: true,
                    msg: 'Вы не авторизированы'
                }
            })
        }
    }, []);

    useEffect(() => {
        api.getPosts()
            .then((data) => data?.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); }))
            .then((data) => {
                setPageCount(Math.ceil(data.length / 12));
                setPostList(data.slice(12 * (page - 1), 12 * (page - 1) + 12))
            });
    }, [page, favorites, user]);

    return (
        <div>
            <HeadField />
            <PostList
                list={postList}
                favorites={favorites}
                setFavorites={setFavorites}
                user={user}
                setPostList={setPostList}
            />
            <Pagination sx={{ mb: 3, mt: 3, ml: 45 }}
                count={pageCount}
                page={page}
                onChange={(_, number) => setPage(number)}
            />
        </div>
    )
}
