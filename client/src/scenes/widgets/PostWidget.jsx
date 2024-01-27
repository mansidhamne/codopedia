import { ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutlined,
    } from "@mui/icons-material"
    import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
    import FlexBetween from "../../components/FlexBetween";
    import Friend from "../../components/Friend";
    import WidgetWrapper from "../../components/WidgetWrapper";
    import { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { setPost } from "../../state";
    
    const PostWidget = ({
        postId,
        postUserId,
        name,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
    }) => {
        const [ isComments, setIsComments ] = useState(false);
        const dispatch = useDispatch();
        const token = useSelector((state) => state.token);
        const loggedInUserId = useSelector((state) => state.user._id);
        const isLiked = Boolean(likes[loggedInUserId]);
        const likeCount = Object.keys(likes).length;
    
        const { palette } = useTheme();
        const main = palette.neutral.main;
        const primary = palette.primary.main;
    
        const patchLike = async() => {
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: loggedInUserId }),
            });
            const updatedPost = await response.json();
            dispatch(setPost({ post:updatedPost }));
        };

        // const handleDelete = async() => {
        //     const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        //         method: "DELETE",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     });

        //     const updatedPosts = await response.json();
        //     dispatch(setPost({ posts: updatedPosts })); // Assuming you have a posts state
        //     onPostDelete();
        // };
    
        return (
            <WidgetWrapper marginTop="1.2rem">
                <Friend 
                    friendId = {postUserId}
                    name={name}
                    subtitle={location}
                    userPicturePath={userPicturePath}
                />
                <Typography color={main} textAlign="left" sx={{ mt: "1rem"}}>
                    {description}
                </Typography>
                {picturePath && (
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`http://localhost:3001/assets/${picturePath}`}
                    />
                )}
                <FlexBetween mt="0.8rem">
                    <FlexBetween gap="0.9rem">
                        <FlexBetween>
                            <IconButton onClick={patchLike} sx={{pl:"0px"}}>
                                {isLiked ? (
                                    <FavoriteOutlined sx={{ color: primary }}/>) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </IconButton>
                            <Typography>{likeCount}</Typography>
                        </FlexBetween>
    
                        <FlexBetween >
                            <IconButton onClick={() => setIsComments(!isComments)} sx={{pl:"0px"}}>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                            <Typography>{comments.length}</Typography>
                        </FlexBetween>
                    </FlexBetween>

                    {/* <FlexBetween>
                        <IconButton onClick={handleDelete} sx={{ pl: "0px" }}>
                            {loggedInUserId === postUserId && <DeleteOutlined />}
                        </IconButton>
                    </FlexBetween> */}
    
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>
    
                {isComments && (
                    <Box mt="0.5rem">
                        {comments.map((comment, i) => (
                            <Box key={`${name}-${i}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                )}
            </WidgetWrapper>
        );
    };
    
    export default PostWidget;