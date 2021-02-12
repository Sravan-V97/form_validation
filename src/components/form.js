import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Logo from "../login.png";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
  OutlinedInput,
  Typography,
  FormHelperText,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: { paddingBottom: "0 !important", paddingTop: "0 !important" },

  subhead: { paddingBottom: 20, paddingTop: 10 },
}));

const validationSchema = yup.object({
  name: yup.string("Enter a name").required("Name is required"),
  city: yup.string("Enter a city").required("City is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  number: yup
    .number("Enter your phone number")
    .min(10, "Phone Number should be of minimum 10 numbers")
    .required("Phone number is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passport: yup
    .string("Enter your passport id")
    .min("Enter a valid passport id")
    .required("Passport id is required"),
  confirmpassword: yup
    .string("Enter your password")
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

function FormValid() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
    console.log(values);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      city: "",
      number: "",
      passport: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="formborder">
        <div className={classes.avatar}>
          <img src={Logo} />
        </div>
        <Typography component="h1" variant="h5" color="primary">
          Putracare
        </Typography>
        <Typography component="h1" variant="h6" className={classes.subhead}>
          SignUp
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                autoComplete="name"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                margin="dense"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                variant="outlined"
                fullWidth
                id="passport"
                label="NRIC / Passport Id"
                name="passport"
                autoComplete="passport_id"
                margin="dense"
                type="number"
                value={formik.values.passport}
                onChange={formik.handleChange}
                error={
                  formik.touched.passport && Boolean(formik.errors.passport)
                }
                helperText={formik.touched.passport && formik.errors.passport}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                autoComplete="city"
                name="city"
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                autoFocus
                margin="dense"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                autoComplete="number"
                name="number"
                variant="outlined"
                fullWidth
                id="number"
                label="Contact Number"
                type="number"
                autoFocus
                margin="dense"
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                margin="dense"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <FormControl
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
                variant="outlined"
                margin="dense"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={values.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText id="component-helper-text">
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                variant="outlined"
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                margin="dense"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmpassword &&
                  Boolean(formik.errors.confirmpassword)
                }
                helperText={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                }
              />
            </Grid>
          </Grid>

          <Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit"
              onClick={formik.handleSubmit}
            >
              Sign Up
            </Button>
            <Grid item className="backlogin">
              <Link className="link" href="#" variant="body2">
                Back to Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default FormValid;
