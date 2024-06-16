import { showErrorToast } from "../components/ui/toast";
import { User } from "../models/User";
import AxiosService from "./axiosService";

const getProfile = () => {
  return AxiosService.get("/api/user/me", { withCredentials: true })
    .then((res) => res.data as User)
    .catch((err) => {
      showErrorToast("Failed to get profile");
      return null;
    });
};

const updateProfile = (data: any) => {
  return AxiosService.put<User>("/api/user/me", data, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

const changePassword = (data: any) => {
  return AxiosService.post<User>("/api/user/me/change-password", data, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

const UserService = {
  getProfile,
  updateProfile,
  changePassword,
};

export default UserService;
