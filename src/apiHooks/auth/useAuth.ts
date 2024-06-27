import apiClient from "@/axios/axiosInstance";
import { useAuthStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
export interface Login {
  username: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  user: {
    username: string;
    _id: string;
    firstName: string;
    lastName: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
}

const login = async (body: Login): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", body);
  return response.data;
};

export const useLoginMutation = () => {
  const { logIn } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store the userAuthInfo in local storage
      localStorage.setItem("userAuthInfo", JSON.stringify(data));

      // Update the userAuthInfo in the Zustand store
      logIn(data);
    },
  });
};

export interface RegisterResponse {
  success: boolean;
  message: string;
  email: string;
}
export interface RegisterPayload {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
}

const register = async (body: RegisterPayload): Promise<RegisterResponse> => {
  const response = await apiClient.post("/auth/register", body);
  return response.data;
};

export const useRegisterMutation = () => {
  return useMutation({ mutationFn: register });
};

const verify = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}): Promise<VerifyResponse> => {
  const response = await apiClient.post("/auth/verify", { code, email });
  return response.data;
};

export const useVerifyMutation = () => {
  return useMutation({ mutationFn: verify });
};
