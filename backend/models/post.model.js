import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  title: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  location: {
    type: String, required: true
  },
  phoneNo: {
    type: String, required: true
  },
  price: {
    type: Number, required: true
  },
  dPrice: {
    type: Number, required: true
  },
  bathroom: {
    type: Number, required: true
  },
  bedroom: {
    type: Number, required: true
  },
  type: {
    type: String, required: true
  },
  cat: {
    type: String, required: true
  },
  furnish: {
    type: String, required: true
  },
  img: {
    type: Array, required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;