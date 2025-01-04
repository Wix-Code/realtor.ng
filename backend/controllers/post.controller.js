import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";


export const createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(200).json({ success: true, message: "post created successfully", post: post })

  } catch (error) {
    res.status(400).json({ success: false, message: "post not created" })
    console.log(error)
  }
}

export const getUserPosts = async (req, res, next) => {

  const userId = req.params.id
  //console.log(userId.username)

  try {

    const user = await Post.find({ userId: userId }).populate('userId').exec()
    res.status(200).json({ success: true, message: "user posts", posts: user })

  } catch (error) {
    res.status(400).json({ success: false, message: "Posts not fetched", error: error })
    console.log(error)
  }
}

export const getAllPosts = async (req, res) => {

  console.log("Received Query Parameters:", req.query);

  try {
    const { cat, location, bathroom, bedroom, sort, type, furnish } = req.query;


    //LIMIT

    /* const limit = parseInt(req.query.limit) || 9;

    //START

    const startIndex = parseInt(req.query.startIndex) || 0;

    //OFFER

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = {
        $in: [false, true]
      }
    }

    let type = req.query.type;
    if (type === undefined || type === "false") {
      sale = {
        $in: ['sale', 'rent']
      }
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = {
        $in: [false, true]
      }
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      furnished = {
        $in: [false, true]
      }
    }

    const search = req.query.serch || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const posts = await Post.find({
      name: {
        $regex: search, $options: "i"
      },
      offer,
      furnished,
      type,
      parking,
    }).sort({
      [sort]: order
    }).limit(limit).skip(startIndex).populate('userId').lean(); */


    let filter = {};

    let sortOptions = {};
    // Check if a type (buy/rent) is provided, and filter based on it
    if (bathroom) {
      filter.bathroom = Number(bathroom);
    }

    if (bedroom) {
      filter.bedroom = Number(bedroom);
    }

    if (furnish) {
      filter.furnish = furnish;
    }

    if (type) {
      filter.type = type;
    }

    if (cat) {
      filter.cat = cat;
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }
    }




    if (sort === "highest-price") {
      sortOptions.price = -1
    };
    if (sort === "lowest-price") {
      sortOptions.price = 1
    };
    if (sort === "most-recent") {
      sortOptions.createdAt = -1
    };
    if (sort === "oldest") {
      sortOptions.createdAt = 1
    };

    console.log(filter, "filter")


    // Default to sorting by most recent if no sort option is specified
    if (!Object.keys(sortOptions).length) {
      sortOptions.createdAt = -1;
    }

    const posts = await Post.find(filter).sort(sortOptions).populate('userId').lean()
    console.log(posts, "posts")

    res.status(200).json({ success: true, message: "posts fetched", posts: posts });
    console.log(posts, "posts")
    return;

  } catch (error) {
    res.status(400).json({ success: false, message: "Error fetching all posts", error: error })
    console.log(error)
  }
}


export const getSinglePosts = async (req, res, next) => {

  const postId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ success: false, message: "Invalid Post ID" });
  }
  //let name = await User.findOne(req.body.username)
  try {
    const post = await Post.findById(postId).populate('userId')
    res.status(200).json({ success: true, message: "single post fetched", posts: post })

  } catch (error) {
    res.status(400).json({ success: false, message: "You can only get your own posts", error: error })
    console.log(error)
  }
}

export const deleteUserPosts = async (req, res, next) => {

  const posts = await Post.findById(req.params.id);
  if (!posts) {
    return res.status(404).json({ success: false, message: "Post not found" })
  }
  if (String(req.user.id) !== String(posts.userId)) {
    return res.status(401).json({ success: false, message: "You can only delete your own post" })
  }
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "post deleted successfully" })

  } catch (error) {
    res.status(400).json({ success: false, message: "You can only get your own posts", error: error })
    console.log(error)
  }
}

export const updateUserPost = async (req, res, next) => {

  const posts = await Post.findById(req.params.id);
  console.log(posts)
  if (!posts) {
    return res.status(404).json({ success: false, message: "Post not found" })
  }
  if (req.user.id !== posts.userId.toString()) {
    return res.status(401).json({ success: false, message: "You can only update your own post" })
  }
  try {
    const update = await Post.findByIdAndUpdate(req.params.id,
      req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, message: "post updated successfully", update: update })

  } catch (error) {
    res.status(400).json({ success: false, message: "You can only get your own posts", error: error })
    console.log(error)
  }
}