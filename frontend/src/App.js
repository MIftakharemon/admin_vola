import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
// Types
import { SET_ADMIN, UNSET_ADMIN } from "./store/admin/types";

import { IdleTimeoutManager } from "idle-timer-manager";

// Components
import Login from "./pages/LoginPage";
import UnlockScreenPage from "./pages/UnlockScreenPage";
import Page404 from "./pages/Page404";
import Admin from "./pages/Admin";
import AuthRouter from "./util/AuthRouter";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Registration from "./pages/Registration";
import UpdateCode from "./pages/UpdateCode";
import Spinner from "./pages/Spinner";
import axios from "axios"

function App() {
  const dispatch = useDispatch();
  const isAuth = sessionStorage.getItem("isAuth");
  const key = sessionStorage.getItem("KEY");
  const token = sessionStorage.getItem("TOKEN");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    axios
      .get("/validateLogin")
      .then((res) => {
        setLogin(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!token && !key) return;
    dispatch({ type: SET_ADMIN, payload: token })
  }, [dispatch, token, key]);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 1800, // 30 minutes
      onExpired: () => {
        dispatch({ type: UNSET_ADMIN });
        window.location.href = "/";
      },
    });

    return () => {
      manager.clear();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes - Auth Pages */}
            <Route path="/" element={<Registration/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/login" element={<Login/>} />

            {/* Password Recovery */}
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/changePassword/:id" element={<ChangePassword />} />
            <Route path="/unlock" element={<UnlockScreenPage />} />
            <Route path="/code" element={<UpdateCode />} />

            {/* Protected Admin Routes */}
            <Route element={<AuthRouter />}>
              <Route path="/admin/*" element={<Admin />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Spinner />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
