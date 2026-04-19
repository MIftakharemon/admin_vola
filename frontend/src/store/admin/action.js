import axios from "axios";
import { Toast } from "../../util/Toast";

import { SET_ADMIN, SIGNUP_ADMIN, UNSET_ADMIN, UPDATE_PROFILE } from "./types";
import { apiInstanceFetch } from "../../util/api";
import { projectName, baseURL, key } from "../../util/Config";
import { STORAGE_KEYS } from "../../util/permissions";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "key": key,
  },
});

export const signupAdmin = (signup) => (dispatch) => {
  return api
    .post("/admin/signup", signup)
    .then((res) => {
      console.log("Signup response:", res.data);
      if (res.data.status) {
        dispatch({ type: SIGNUP_ADMIN });
        Toast("success", "Signup Successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      Toast("error", error.message || "Signup failed");
    });
};

export const login = (data) => (dispatch) => {
  api
    .post("/admin/login", data)
    .then((res) => {
      if (res.data.status) {
        const loginType =
          (res.data.loginType || res.data.admin?.role || "ADMIN").toString().toUpperCase();
        sessionStorage.setItem(STORAGE_KEYS.loginType, loginType);
        sessionStorage.setItem(STORAGE_KEYS.permissions, JSON.stringify(res.data.permissions || []));
        Toast("success", `You have successfully logged in ${projectName}`);
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 10);
        dispatch({ type: SET_ADMIN, payload: res.data.token });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) =>{
    });
};

export const loginStaff = (data) => (dispatch) => {
  axios
    .post("subAdmin/signInSubAdmin", { email: data.email, password: data.password })
    .then((res) => {
      const status = res.data?.status === true;
      const subAdmin = res.data?.subAdmin || res.data?.data?.subAdmin || res.data?.subadmin;
      console.log('subAdmin', subAdmin)
      const token =
        res.data?.token ||
        res.data?.accessToken ||
        res.data?.data?.token ||
        res.data?.data?.accessToken;

      if (status && subAdmin) {
        const perms = subAdmin.permissions || res.data?.permissions || [];
        const user = {
          name: subAdmin.name || subAdmin.role || "Staff",
          email: subAdmin.email || data.email,
          image: subAdmin.image,
        };
        sessionStorage.setItem(STORAGE_KEYS.loginType, "staff");
        sessionStorage.setItem(STORAGE_KEYS.permissions, JSON.stringify(perms));
        sessionStorage.setItem("user", JSON.stringify(user));
        if (token) {
          dispatch({ type: SET_ADMIN, payload: token });
        }
        Toast("success", res.data?.message || "Staff login successful!");
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 10);
      } else {
        Toast("error", res.data?.message || "Staff login failed");
      }
    })
    .catch((error) => {
      const msg =
        error.response?.data?.message || error.message || "Staff login failed";
      Toast("error", msg);
    });
};

export const sendEmail = (data) => (dispatch) => {
  api
    .post("/admin/sendEmail", data)
    .then((res) => {
      if (res.data.status) {
        Toast(
          "success",
          "Mail has been sent successfully. Sometimes mail has been landed on your spam!"
        );
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const getProfile = () => (dispatch) => {
  apiInstanceFetch
    .get("admin/profile")
    .then((res) => {
    
      if (res.status) {
        dispatch({ type: UPDATE_PROFILE, payload: res.admin });
      } else {
        Toast("error", res.message);
      }
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

export const changePassword = (data) => (dispatch) => {
  api
    .put("/admin", data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Password changed successfully.");
        setTimeout(() => {
          dispatch({ type: UNSET_ADMIN });
          window.location.href = "/";
        }, [3000]);
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};
export const updateNameEmail = (data) => (dispatch) => {
  api
    .patch("/admin", data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Profile updated successfully.");
        dispatch({ type: UPDATE_PROFILE, payload: res.data.admin });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};


export const updateCode = (signup) => (dispatch) => {
  api
    .patch("/admin/updateCode", signup)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Purchase Code Update Successfully !");
        setTimeout(() => {
          window.location.replace("/login");
        }, 3000);
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      Toast("error", error);
    });
};
