import express from 'express';

import { createPost, getPosts, updatePost, deletePost, updateComment } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

router.patch('/:id/:commentId', updateComment)

export default router;