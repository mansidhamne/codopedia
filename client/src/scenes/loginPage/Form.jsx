// import { useState } from "react"
// import { Box, Typography, useMediaQuery, useTheme, Button, TextField } from "@mui/material"
// import { Formik } from "formik"
// import * as yup from "yup"
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
// import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { setLogin } from "../../state/index.jsx"
// import Dropzone from "react-dropzone"
// import FlexBtwn from "../../components/flexbtwn"

// const registerSchema = yup.object().shape({
//     name: yup.string().required("Required"),
//     email: yup.string().email("Invalid Email").required("Required"),
//     username: yup.string().required("Required"),
//     password: yup.string().required("Required"),
//     role: yup.string().required("Required"),
//     picture: yup.string().required("Required"),
//     location: yup.string().required("Required"),
//     github: yup.string().optional(),
//     linkedin: yup.string().optional(),
// });

// const loginSchema = yup.object().shape({
//     email: yup.string().email("Invalid Email").required("Required"),
//     password: yup.string().required("Required"),
// });

// const initialValueRegister = {
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//     picture: "",
//     location: "",
//     github: "",
//     linkedin: "",
// };

// const initialValuesLogin = {
//     email: "",
//     password: "",
// };

// const Form = () => {
//     //states:
//     const [ pageType, setPageType ] = useState("login");
//     const { palette } = useTheme();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const isLogin = pageType === "login";
//     const isRegister = pageType === "register";
//     const isNonMobile = useMediaQuery("(min-width:600px)");


//     const register = async (values, onSubmitProps) => {
//         const formData = new FormData();
//         for (let value in values){
//             formData.append(value, values[value]);
//         }
//         formData.append("picturePath", values.picture.name);

//         const savedUserResponse = await fetch(
//             "http://localhost:3001/auth/register",
//             {
//                 method: "POST",
//                 body: formData,
//             }
//         );

//         const savedUser = await savedUserResponse.json();
//         onSubmitProps.resetForm();

//         if (savedUser) {
//             setPageType("login");
//         }
//     };

//     const login = async(values, onSubmitProps) => {
//         const loggedInResponse = await fetch(
//             "http://localhost:3001/auth/login", 
//             {
//                 method: "POST",
//                 headers: {"Content-Type" : "application/json"},
//                 body: JSON.stringify(values),
//             }
//         );

//         const loggedIn = await loggedInResponse.json();
//         console.log("Logged In Response:", loggedIn);
//         onSubmitProps.resetForm();

//         if(loggedIn){
//             dispatch(
//                 setLogin({
//                     user: loggedIn.user,
//                     token: loggedIn.token,
//                 })
//             );
//             navigate("/home");
//         }
//     };

//     // const login = async (values, onSubmitProps) => {
//     //     try {
//     //       onSubmitProps.resetForm(); // Reset form before sending request
      
//     //       const loginResponse = await fetch("http://localhost:3001/auth/login", {
//     //         method: "POST",
//     //         headers: { "Content-Type": "application/json" },
//     //         body: JSON.stringify(values),
//     //       });
      
//     //       const { user, token } = await loginResponse.json();
      
//     //       if (user && token) {
//     //         dispatch(setLogin({ user, token }));
//     //         navigate("/home");
//     //       } else {
//     //         // Handle invalid login credentials
//     //         console.error("Invalid login credentials");
//     //         // Display error message to the user
//     //       }
//     //     } catch (error) {
//     //       console.error("Login error:", error);
//     //       // Handle network errors or other issues
//     //     }
//     //   };
      
//     const handleFormSubmit = async(values, onSubmitProps) => {
//         if (isLogin) await login(values, onSubmitProps);
//         if (isRegister) await register(values, onSubmitProps);
//     };

//     return (
//         <Formik
//             onSubmit={handleFormSubmit}
//             initialValues={isLogin ? initialValuesLogin : initialValueRegister}
//             validationSchema={isLogin ? loginSchema : registerSchema}
//         >
//             {({
//                 values,
//                 errors,
//                 touched,
//                 handleBlur,
//                 handleChange,
//                 handleSubmit,
//                 setFieldValue,
//                 resetForm,
//             }) => (
//                <form onSubmit={handleSubmit}>
//                     <Box
//                         display="grid"
//                         gap="30px"
//                         gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//                         sx={{
//                             "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
//                         }}
//                     >
//                        {isRegister && (
//                             <>
//                                 <TextField
//                                     label="Name"
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values.name}
//                                     name="name"
//                                     error={Boolean(touched.name) && Boolean(errors.name)}
//                                     helperText={touched.name && errors.name}
//                                     sx={{
//                                         gridColumn: "span 2",
//                                         input: {color: 'white'}
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: '#999999' },
//                                     }}
//                                 />
//                                 <TextField
//                                     label="Username"
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values.username}
//                                     name="username"
//                                     error={Boolean(touched.username) && Boolean(errors.username)}
//                                     helperText={touched.username && errors.username}
//                                     sx={{
//                                         gridColumn: "span 2",
//                                         input: {color: 'white'}
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: '#999999' },
//                                     }}
//                                 />
//                                 <TextField
//                                     label="Role"
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values.role}
//                                     name="role"
//                                     error={Boolean(touched.role) && Boolean(errors.role)}
//                                     helperText={touched.role && errors.role}
//                                     sx={{
//                                         gridColumn: "span 2",
//                                         input: {color: 'white'}
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: '#999999' },
//                                     }}
//                                 />
//                                 <TextField
//                                     label="Location"
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values.location}
//                                     name="location"
//                                     error={Boolean(touched.location) && Boolean(errors.location)}
//                                     helperText={touched.location && errors.location}
//                                     sx={{
//                                         gridColumn: "span 2",
//                                         input: {color: 'white'}
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: '#999999' },
//                                     }}
//                                 />
//                                 <TextField
//                                     label="Github"
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values.github}
//                                     name="github"
//                                     error={Boolean(touched.github) && Boolean(errors.github)}
//                                     helperText={touched.github && errors.github}
//                                     sx={{
//                                         gridColumn: "span 2",
//                                         input: {color: 'white'}
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: '#999999' },
//                                     }}
//                                 />
//                                 <TextField
//                                     label="Linkedin"
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values.linkedin}
//                                     name="linkedin"
//                                     error={Boolean(touched.linkedin) && Boolean(errors.linkedin)}
//                                     helperText={touched.linkedin && errors.location}
//                                     sx={{
//                                         gridColumn: "span 2",
//                                         input: {color: 'white'}
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: '#999999' },
//                                     }}
//                                 />
//                                 <Box
//                                     gridColumn="span 4"
//                                     border={`1px solid ${palette.neutral.medium}`}
//                                     borderRadius="5px"
//                                     p="1rem"
//                                 >
//                                     <Dropzone
//                                         acceptedFiles=".jpg,.jpeg,.png"
//                                         multiple={false}
//                                         onDrop={(acceptedFiles) => 
//                                             setFieldValue("picture", acceptedFiles[0])
//                                         }
//                                     >
//                                         {({ getRootProps, getInputProps }) => (
//                                             <Box
//                                                 {...getRootProps()}
//                                                 border={`2px dashed ${palette.primary.main}`}
//                                                 p="1rem"
//                                                 sx={{ "&:hover": { cursor: "pointer" } }}
//                                             >
//                                                 <input {...getInputProps()} />
//                                                 {!values.picture ? (
//                                                     <p>Add Picture Here</p>
//                                                 ) : (
//                                                 <FlexBtwn>
//                                                     <Typography
//                                                         sx={{
//                                                             color: "#999999", 
//                                                         }}
//                                                     >{values.picture.name}</Typography>
//                                                     <EditOutlinedIcon />
//                                                 </FlexBtwn>
//                                                 )}
//                                             </Box>
//                                         )}
//                                     </Dropzone>
//                                 </Box>
//                             </>
//                        )}
//                        <TextField
//                             label="Email"
//                             onBlur={handleBlur}
//                             onChange={handleChange}
//                             value={values.email}
//                             name="email"
//                             error={Boolean(touched.email) && Boolean(errors.email)}
//                             helperText={touched.email && errors.email}
//                             sx={{
//                                 gridColumn: "span 4",
//                                 input: {color: 'white'}
//                             }}
//                             InputLabelProps={{
//                                 style: { color: '#999999' },
//                             }}
//                         />
//                         <TextField
//                             label="Password"
//                             type="password"
//                             onBlur={handleBlur}
//                             onChange={handleChange}
//                             value={values.password}
//                             name="password"
//                             error={Boolean(touched.password) && Boolean(errors.password)}
//                             helperText={touched.password && errors.password}
//                             sx={{
//                                 gridColumn: "span 4",
//                                 input: {color: 'white'}
//                             }}
//                             InputLabelProps={{
//                                 style: { color: '#999999' },
//                             }}
//                         />             
//                     </Box>

//                     {/* BUTTONS */}
//                     <Box>
//                         <Button
//                             fullWidth
//                             type="submit"
//                             sx={{
//                                 m: "2rem 0",
//                                 p: "1rem",
//                                 fontSize: "1rem",
//                                 backgroundColor: palette.primary.main,
//                                 color: palette.background.alt,
//                                 "&:hover": { color: palette.primary.main },
//                             }}
//                         >
//                             { isLogin ? "LOGIN" : "REGISTER"}
//                         </Button>
//                         <Typography
//                             onClick={() => {
//                                 setPageType(isLogin ? "register" : "login");
//                                 resetForm();
//                             }}
//                             sx={{
//                                 textDecoration: "underline",
//                                 color: palette.primary.main,
//                                 "&:hover" : {
//                                     cursor: "pointer",
//                                     color: palette.primary.light,
//                                 },
//                             }}
//                         >
//                             {isLogin ? "Don't have an account ? Sign Up Here" : "Already have an account ? Login Here"}
//                         </Typography>
//                     </Box>
//                </form> 
//             )}
//         </Formik>
//     )
// }

// export default Form;


import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  role: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  role: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [errorMessage, setErrorMessage] = useState(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isDarkMode = useSelector((state) => state.mode === "dark");

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    console.log("Logged In Response:", loggedIn);
    onSubmitProps.resetForm();

    if (loggedIn.msg && loggedIn.msg === 'User Not Found!') {
        // If user is not found, display an error message
        console.error("User Not Found!");
        // Show an error message to the user
        // You can use a state variable to manage the visibility of the error message
        setErrorMessage("Invalid credentials");
    } else if (loggedIn.user && loggedIn.token) {
        // If user and token are present in the response, dispatch the action
        dispatch(setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
        }));
        navigate("/home");
    } else {
        // If there's an unexpected response structure or error, log an error
        console.error("Unexpected server response:", loggedIn);
        // Show an error message to the user
        setErrorMessage("Invalid credentials");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                    input: {color: 'white'}
                  }}
                  InputLabelProps={{
                    style: { color: '#999999' },
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                    input: {color: 'white'}
                  }}
                  InputLabelProps={{
                    style: { color: '#999999' },
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 2",
                    input: {color: 'white'}
                  }}
                  InputLabelProps={{
                    style: { color: '#999999' },
                  }}
                />
                <TextField
                  label="Role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={
                    Boolean(touched.role) && Boolean(errors.role)
                  }
                  helperText={touched.role && errors.role}
                  sx={{
                    gridColumn: "span 2",
                    input: {color: 'white'}
                  }}
                  InputLabelProps={{
                    style: { color: '#999999' },
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid black`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`1.5px dashed black`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p style={{ color: "#999999" }}>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography sx={{color:"white"}}>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
                input: {color: 'white'}
              }}
              InputLabelProps={{
                style: { color: '#999999' },
              }}                               
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
                input: {color: 'white'}
              }}
              InputLabelProps={{
                style: { color: '#999999' },
              }}   
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            {errorMessage && (
                        <Typography color="error" pt="1.1rem">{errorMessage}</Typography>
            )}
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "1rem 0",
                p: "1rem",
                fontSize: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setErrorMessage(null);
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: isDarkMode ? palette.primary.light : palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;