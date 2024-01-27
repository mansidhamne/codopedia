import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%" 
        padding="1rem"
        textAlign="center"
        mt="3rem"
      >
        <Typography fontWeight="bold" fontSize="37px" color="primary">
          Codopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "65%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.neutral.dark}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color={theme.palette.neutral.light}>
          Welcome to Codopedia, the Social Media for Coders!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
