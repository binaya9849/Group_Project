import { useState, useEffect } from "react";
import { Mail, Lock, User, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { toggleAuthPopup } from "../../store/slices/popupSlice";
import {
  forgotPassword,
  register,
  resetPassword,
  login,
} from "../../store/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    authUser,
    isSigningUp,
    isLoggingIn,
    isRequestingForToken,
  } = useSelector((state) => state.auth);

  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const [mode, setMode] = useState("signin");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // RESET MODE DETECTION
  useEffect(() => {
    if (location.pathname.startsWith("/password/reset/")) {
      setMode("reset");
      dispatch(toggleAuthPopup());
    }
  }, [location.pathname, dispatch]);

  // =========================
  // HANDLE SUBMIT (FIXED)
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, name, confirmPassword } = formData;

    console.log("MODE:", mode);
    console.log("FORM DATA:", formData);

    // FORGOT PASSWORD
    if (mode === "forgot") {
      dispatch(forgotPassword({ email })).then(() => {
        dispatch(toggleAuthPopup());
        setMode("signin");
      });
      return;
    }

    // RESET PASSWORD
    if (mode === "reset") {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const token = location.pathname.split("/").pop();

      dispatch(
        resetPassword({
          token,
          password,
          confirmPassword,
        })
      );

      return;
    }

    // LOGIN DATA
    const data = { email, password };

    // SIGNUP
    if (mode === "signup") {
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      dispatch(register({ name, email, password }));
    } else {
      // LOGIN
      dispatch(login(data));
    }

    // CLEAR FORM
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  if (!isAuthPopupOpen || authUser) return null;

  const isLoading =
    isLoggingIn || isSigningUp || isRequestingForToken;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div className="absolute inset-0 backdrop-blur-md bg-[hsla(var(--glass-bg))]" />

      <div className="relative z-10 glass-panel w-full max-w-md animate-fade-in-up">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary text-center w-full">
            {mode === "signin" && "Welcome Back!"}
            {mode === "signup" && "Create an Account"}
            {mode === "forgot" && "Forgot Password"}
            {mode === "reset" && "Reset Password"}
          </h2>

          <button
            onClick={() => dispatch(toggleAuthPopup())}
            className="p-2 rounded-lg glass-card"
          >
            <X className="h-5 w-5 text-primary" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 py-3 border rounded-lg"
                required
              />
            </div>
          )}

          {/* EMAIL */}
          {mode !== "reset" && (
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 py-3 border rounded-lg"
                required
              />
            </div>
          )}

          {/* PASSWORD */}
          {mode !== "forgot" && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 py-3 border rounded-lg"
                required
              />
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          {mode === "reset" && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full pl-10 py-3 border rounded-lg"
                required
              />
            </div>
          )}

          {/* FORGOT */}
          {mode === "signin" && (
            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => setMode("forgot")}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {isLoading ? "Loading..." : mode === "signup"
              ? "Create Account"
              : mode === "forgot"
              ? "Send Email"
              : mode === "reset"
              ? "Reset Password"
              : "Login"}
          </button>
        </form>

        {/* SWITCH */}
        {["signin", "signup"].includes(mode) && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() =>
                setMode(mode === "signup" ? "signin" : "signup")
              }
            >
              {mode === "signup"
                ? "Already have account? Sign in"
                : "Create new account"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;