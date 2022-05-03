import { config } from './config';

class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }

    getPosts(itemID){
        const requestURL = itemID? `${this._url}/posts/${itemID}` : `${this._url}/posts`;
        return fetch(requestURL, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        })
        .then(res => res.json())
        .catch(err => alert(err.message));

    }
    addPost(post) {
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
        })
        .then(res => res.json())
        .catch(err => alert(err.message));     
    };

    deletePost(itemID){
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        })
        .then(res => res.json())
        .catch(err =>alert(err.message));

    };

    getComment(id){

        return fetch(`${this._url}/posts/comments/${id}`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        })
        .then(res => res.json())
        .catch(err => alert(err.message));


    }

    addComment(ID, comment){
        return fetch(`${this._url}/posts/comments/${ID}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(comment),
        })
        .then(res => res.json())
        .catch(err => alert(err.message));

    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        })
        .then(res => res.json())
        .catch(err => alert(err.message));

    }

    addLike(postId){
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        })
      
    }

    deleteLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        })

    }

}

export default new Api(config);
