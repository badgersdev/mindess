import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(3, "minimum 3 characters please...")
    .max(15, "i need maximum 15 characters...")
    .required(""),
  email: Yup.string().email("Please enter a valid email ").required(""),
  password: Yup.string().min(5).min(8).max(40).required(""),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});
