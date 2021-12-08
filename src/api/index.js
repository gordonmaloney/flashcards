import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000' });

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const updateComment = (id, commentId, updatedComment) => API.patch(`/posts/${id}/${commentId}`, updatedComment)
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/${commentId}`)