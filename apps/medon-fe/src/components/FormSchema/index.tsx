import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  email: Yup.string().email().required("E-mail is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()/=_+-])[0-9a-zA-Z!@#$%^&*()/=_+-]{6,}$/,
      "Password must include at least one capital letter, one small letter, one special character and one number"
    )
    .required("Password is required")
});
