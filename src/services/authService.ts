import { LoginFormData } from "src/components/forms/login-form";
import { RegisterFormData } from "src/components/forms/register-form";
import AxiosService from "./axiosService";

const register = (data: RegisterFormData) => {
  return AxiosService.post(
    "/api/auth/register",
    {
      name: data.username,
      password: data.password,
      email: data.email,
    },
    { withCredentials: true }
  );
};

const login = (data: LoginFormData) => {
  return AxiosService.post(
    "/api/auth/authenticate",
    {
      email: data.email,
      password: data.password,
    },
    { withCredentials: true }
  );
};

const logOut = () => {
  return AxiosService.get("/api/auth/logout", {
    withCredentials: true,
  });
};

const AuthService = {
  register,
  login,
  logOut,
};

export default AuthService;
