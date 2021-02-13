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
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  grid: { paddingBottom: "0 !important", paddingTop: "0 !important" },

  subhead: { paddingBottom: 20, paddingTop: 10, fontSize: 16 },

  mainhead: { fontSize: 24 },

  logo: { width: 40 },

  formborder: {
    border: "1px solid #e8e8e8",
    padding: "1rem 3rem",
    borderRadius: 15,
  },

  container: {
    maxWidth: 555,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  submit: {
    float: "right",
    marginTop: 8,
    boxShadow: "none",
  },

  backlogin: {
    height: 50,
    display: "flex",
    marginTop: 20,
    verticalAlign: "middle",
  },

  link: { alignSelf: "center" },

  pswd: { fontSize: 14 },
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
    .min(8, "Enter a valid passport id")
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

  const [open, setOpen] = React.useState(false);

  const openAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
      // alert(JSON.stringify(values, null, 2));
      axios
        .post("https://60275261dd4afd001754a73e.mockapi.io/api/signin", values)
        .then((response) => {
          console.log(response);
          openAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <Container component="main" className={classes.container}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Registration Sucessful
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.formborder}>
        <div className={classes.avatar}>
          <img src={Logo} className={classes.logo} />
        </div>
        <Typography variant="h5" color="primary" className={classes.mainhead}>
          Putracare
        </Typography>
        <Typography variant="h6" className={classes.subhead}>
          Sign Up
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  style: { fontSize: 14 },
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
                InputLabelProps={{
                  style: { fontSize: 14 },
                }}
                variant="outlined"
                fullWidth
                id="passport"
                label="NRIC / Passport Id"
                name="passport"
                autoComplete="passport_id"
                margin="dense"
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
                InputLabelProps={{
                  style: { fontSize: 14 },
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
                InputLabelProps={{
                  style: { fontSize: 14 },
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
                InputLabelProps={{
                  style: { fontSize: 14 },
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
                InputLabelProps={{
                  style: { fontSize: 14 },
                }}
                variant="outlined"
                margin="dense"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  className={classes.pswd}
                >
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
                InputLabelProps={{
                  style: { fontSize: 14 },
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
              className={classes.submit}
              onClick={formik.handleSubmit}
            >
              Register
            </Button>
            <Grid item className={classes.backlogin}>
              <Link className={classes.link} href="#" variant="body2">
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
