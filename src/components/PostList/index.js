import React from 'react';
import { PostCard } from '../PostCard';
import './index.css';

export const PostList = ({ list, favorites, setFavorites, user, setPostList }) => {
    return (
        <div className="cards">
            {list?.map((item) => (
                <PostCard
                    key={item._id}
                    itemPost={item}
                    isInFavorites={item?.likes.includes(user?._id)}
                    setFavorites={setFavorites}
                    setPostList = {setPostList}
                    user={user}
                />
            ))}
        </div>
    );
};