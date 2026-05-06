import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    dispatch(login(data));
  };
  const { User,isAuthenticated,loading } = useSelector((state) => state.auth);
  if (isAuthenticated && User.role === "admin") {
    return <Navigate to="/" />;
  }

  return <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
  <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 sm:p-10">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
    welcome Back
    </h2>
  <form onSubmit={handleLogin} className="space-y-5">
    <div className="p-2">
      <label 
      htmlFor="email"
       className="block text-sm font-medium text-gray-700 mb-1"
       >
        Email Address
        </label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="enter your email"
      className="w-full px-4 py-3 border border-gray-300 rounded-md"
      />
    </div>
    <div className="p-2">
      <label 
      htmlFor="password"
       className="block text-sm font-medium text-gray-700 mb-1"
       >
        Password
        </label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="enter your password"
      className="w-full px-4 py-3 border border-gray-300 rounded-md"
      />
    </div>
    <div className="p-2 flex items-center justify-between items-center text-sm text-gray-500">
      <div> 
        <input type="checkbox" id="remember" className="w-4 h-4" />
        <label htmlFor="remember">Remember me</label>
        </div>
        <link to={"/forgot-password"} type="button" className="text-blue-600 hover:underline">
        Forgot password?
        </link>
      </div>
    <div className="p-2">
       <button type="submit" className="w-full flex justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition"
      
      disabled={loading}
      >
        {loading ? (
          <>
          <div className="w-5 h-5 border-2 bg-white border-t-transparent rounded-full animate-spin"/>
          <span>Signing in...</span>
          </>
        ): (
          "Sign In"
        )}
   
      </button>
      </div>
      </form>
    </div>
    </div>
    </>
  ;
};

export default Login;