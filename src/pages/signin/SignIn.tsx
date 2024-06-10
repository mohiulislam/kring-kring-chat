import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/lib/features/api/auth/loginApi";
import { toast } from "react-hot-toast";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  console.log(JSON.stringify(error));

  const onSubmit = (data: FormData) => {
    login({
      username: data.email,
      password: data.password,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      navigate("/chat");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }
  }, [isError]);
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ textAlign: "center", width: "40%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography sx={{ color: "text.primary" }} variant="h5">
          Sign In
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email or Phone number"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {isError && (
          <Typography color="error">{(error as any).data.message}</Typography>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          {isLoading ? "Signin in..." : "Sign In"}
        </Button>
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
}
