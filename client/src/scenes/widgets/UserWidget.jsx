import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [ user, setUser ] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    useEffect(() => {
        const getUser = async () => {
          try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setUser(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        getUser();
      }, [token]);

    //a loading state should exist here 
    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        role,
        location,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/*FIRST ROW*/}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                // onClick={() => navigate(`/profile/{_id}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}></UserImage>
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="600"
                            pb="0.2rem"
                            sx={{
                                "&:hover":{
                                    color: palette.primary.dark,
                                    cursor: "pointer"
                                }
                            }}
                        > 
                            {firstName} {lastName}
                        </Typography>
                        {friends !== undefined && (
                            <Typography color={medium}>{friends.length} Friends</Typography>
                        )}
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlinedIcon 
                    sx={{
                        "&:hover":{
                            color: palette.primary.dark,
                            cursor: "pointer"
                        }
                    }}
                />
                </FlexBetween>
                <Divider />

                {/*SECOND ROW */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlinedIcon fontSize="large" sx={{ color: main }} />
                            <Typography color={medium}>{location}</Typography>
                    </Box>
                    {/* <Box display="flex" alignItems="center" gap="1rem">
                    <WorkspacePremiumOutlinedIcon fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{role}</Typography>
                    </Box> */}
                </Box>

                <Divider/>

                {/* THIRD ROW */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Profile Views: </Typography>
                            <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>Impressions: </Typography>
                            <Typography color={main} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                </Box>  
                
                {/* FOURTH ROW */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                    </Typography>

                    <FlexBetween gap="1rem" alignItems="center" justify-content="space-between" mb="0.5rem">
                        <a href="https://twitter.com/?lang=en" target="_blank">
                            <img src="../assets/twitter.png" alt="twitter" />
                        </a>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                Twitter
                                </Typography>
                                <Typography pl="0.5rem" color={medium}>Social Network</Typography>
                            </Box>
                        <EditOutlinedIcon
                            sx={{ 
                                color: main, 
                                "&:hover":{
                                    color: palette.primary.dark,
                                    cursor: "pointer"
                                }
                            }} 
                        />
                    </FlexBetween>

                    <FlexBetween gap="1rem" alignItems="center" justify-content="space-between">
                    <a href="https://linkedin.com/?lang=en" target="_blank">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                    </a>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Linkedin
                                </Typography>
                                <Typography color={medium}>Network Platform</Typography>
                            </Box>
                    <EditOutlinedIcon 
                        sx={{ 
                            color: main, 
                            "&:hover":{
                                color: palette.primary.dark,
                                cursor: "pointer"
                            }
                        }} 
                    />
                    </FlexBetween>
                </Box>
            
        </WidgetWrapper>
    );
};

export default UserWidget;

