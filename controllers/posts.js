import mongoose from 'mongoose';
import PostBody from '../models/PostBody.js';

export const getPosts = async (req, res) => {
    try {
        const getPosts = await PostBody.find();

        res.status(200).json(getPosts);
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostBody(post);

    try {
        await newPost.save();

        console.log("controler", post)

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    const updatedPost = await PostBody.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    res.json(updatedPost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    await PostBody.findByIdAndRemove(id);

    console.log('delete post')

    res.json({message: 'post deleted successfully'});
}


export const updateComment = async (req, res) => {
    
    console.log("req body", req.body)

    const { id: _id } = req.params;
    const { commentId: commentId } = req.params

    console.log("comment id ", commentId)

    const user = await PostBody.findById(_id)
    const card = user.cards.filter(reply => reply.id == commentId)[0]

    card.date = req.body.date
    card.delay = req.body.delay
    card.reviews = req.body.reviews

    user.save()

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    //const updatedComment = await PostBody.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    res.json(user);
}