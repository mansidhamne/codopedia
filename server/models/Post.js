// import mongoose from "mongoose";

// const PostSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: String, 
//             required: true,
//         },
//         username: {
//             type: String, 
//             required: true, 
//             min: 2, 
//             max: 20,
//         }, 
//         role: {
//             type: String, 
//             required: true, 
//             min: 2, 
//             max: 30,
//         },
//         userPicturePath: {
//             type: String, 
//             default: "",
//         },
//         picturePath: {
//             type: String, 
//             default: "",
//         },
//         description: {
//             type: String,
//             default: "",
//             max: 50,
//         }, 
//         comments: {
//             type: Array,
//             default: [],
//         }, 
//         stars: {
//             type: Map,
//             of: Boolean,
//         }
//     },
//     { timestamps: true }
// );

// const Post = mongoose.model("Post", PostSchema);

// export default Post;

import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;