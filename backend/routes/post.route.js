import express from "express"
import { createPost, getSinglePosts, deleteUserPosts, getUserPosts, updateUserPost, getAllPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../components/verifyToken.js";



const router = express.Router();

router.post('/create', verifyToken, createPost)
router.get('/create/:id/posts', getUserPosts)
router.get('/create', getAllPosts)
router.get('/single/:id', getSinglePosts)
router.delete('/delete/:id', verifyToken, deleteUserPosts)
router.post('/update/:id', verifyToken, updateUserPost)


export default router