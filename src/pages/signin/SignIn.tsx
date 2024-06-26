import { useLoginMutation } from "@/apiHooks/auth/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

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
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const {
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
  } = useLoginMutation();

  const onSubmit = (data: FormData) => {
    mutate({
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
          {isPending ? "Signin in..." : "Sign In"}
        </Button>
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
}
