import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* middleware configurations */
/* functions that run between different things */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());  //adds middleware to parse incoming requests
app.use(helmet()); //Helmet middleware to enhance the security of the Express app
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})); //restricts the loading of cross-origin resources.
app.use(morgan("common")); //helps in logging details about incoming requests, such as method, status, response time
app.use(bodyParser.json({ limit: "30mb", extended: true})); // limit the size of the JSON payload to 30 megabytes 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true})); //allow extended payloads, which enables deep parsing of objects.
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
})); //allowing or restricting cross-origin requests based on the configured options
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //set the directory where we keep our assets

/* FILE STORAGE */
const storage = multer.diskStorage({  //multer github
    destination: function(req, file, cb){
        cb(null, "public/assets");
    }, 
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer( {storage} );

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* SETTING UP MONGOOSE */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true }, { useUnifiedTopology : true}
).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    //User.insertMany(users);
    // Post.insertMany(posts);
}).catch((e) => console.log(`${e} did not connect`));