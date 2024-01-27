import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "../../components/UserImage";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../../state";
  
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [ isImage, setIsImage ] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    //API CALL
    const handlePost = async () => { 
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if(image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`,{
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });

        const posts = await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost(""); 
        
        setIsImage(false);
    };
    
    return (
        <WidgetWrapper>
            <FlexBetween gap="1rem"> 
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Say something..."
                    onChange={(e) => setPost(e.target.value)}
                    value = {post}
                    sx ={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                ></InputBase>   
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    mt="1.3rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles = ".jpg,.jpeg,.png" 
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.dark}`}
                                    p="0.5rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()}/>
                                    { !image ? 
                                        ( <p>Add Image Here</p>) :
                                        ( <FlexBetween>
                                            {/* <Typography>{image.name}</Typography> */}
                                            <img
                                                src={URL.createObjectURL(image)} // Use createObjectURL to display the image
                                                alt="Selected Image"
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                            />
                                        </FlexBetween> )
                                    }
                                    <FlexBetween justify-content="flex-end" alignItems="center">
                                    <EditOutlined sx={{ width: "15%" }}/>
                                    {image && (
                                    <IconButton onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                    )}
                                    </FlexBetween>
                                </Box>
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1rem 0"}}/>

            <FlexBetween gap="0.4rem">
                <FlexBetween gap="0.2rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: "medium" }} />
                    <Typography
                        color={"medium"}
                        sx={{ "&:hover": { cursor: "pointer", color: "medium" } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                { isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.2rem" onClick={() => setIsImage(!isImage)}>
                            <GifBoxOutlined sx={{ color: "medium" }}/>
                            <Typography>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.2rem" onClick={() => setIsImage(!isImage)}>
                            <AttachFileOutlined sx={{ color: "medium" }}/>
                            <Typography>Attatchment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.2rem" onClick={() => setIsImage(!isImage)}>
                            <MicOutlined sx={{ color: "medium" }}/>
                            <Typography>Audio</Typography>
                        </FlexBetween>
                    </> ) : 
                    (
                        <FlexBetween>
                            <MoreHorizOutlined sx={{ color: "medium" }}/>
                        </FlexBetween>
                    )    
                }

                <Button
                    disabled={!post && !image}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;



