import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  id: String,
  name: String,
  level: String,
  cards: [
    { id: String, date: Number, delay: String, reviews: String }
  ]
});

const PostBody = mongoose.model("PostBody", postSchema);

export default PostBody;
