// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String, 
//             required: true,
//             min: 2,
//             max: 20,
//         }, 
//         username: {
//             type: String, 
//             required: true, 
//             min: 2, 
//             max: 20,
//             //unique: true,
//         }, 
//         password: {
//             type: String, 
//             required: true, 
//             min: 5, 
//             validate: {
//                 validator: function(value){
//                     return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
//                 },
//                 message: 'Atleast one upper case letter, one number and one special character',
//             },
//         },
//         email: {
//             type: String, 
//             required: true, 
//             max: 50,
//             unique: true,
//         },
//         role: {
//             type: String, 
//             required: true, 
//             min: 2, 
//             max: 30,
//         },
//         picturePath: {
//             type: String, 
//             default: "",
//         },
//         friends: {
//             type: Array,
//             default: []
//         },
//         skills: {
//             type: Array,
//             default: []
//         },
//         curLocation: String,
//         stars: Number,
//         github: String,
//         linkedin: String,
//     },
//     { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema)

// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    role: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;