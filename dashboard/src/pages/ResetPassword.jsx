import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(resetPassword(data, token));
  };
  const { User,isAuthenticated,loading } = useSelector((state) => state.auth);
  if (isAuthenticated && User.role === "admin") {
    return <Navigate to="/" />;
  }



  return <>
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
  <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 sm:p-10">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
   reset Password
    </h2>
  <form onSubmit={handleSubmit} className="space-y-5">
    <div className="p-2">
      <label 
      htmlFor="password"
       className="block text-sm font-medium text-gray-700 mb-1"
       >
        New Password
        </label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="enter your new password"
      className="w-full px-4 py-3 border border-gray-300 rounded-md"
      />
    </div>
    <div className="p-2">
      <label 
      htmlFor="confirmPassword"
       className="block text-sm font-medium text-gray-700 mb-1"
       >
        Confirm Password
        </label>
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="enter your confirm password"
      className="w-full px-4 py-3 border border-gray-300 rounded-md"
      />
    </div>
    
    <div className="p-2">
       <button type="submit" className="w-full flex justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition"
      
      disabled={loading}
      >
        {loading ? (
          <>
          <div className="w-5 h-5 border-2 bg-white border-t-transparent rounded-full animate-spin"/>
          <span>Resetting password...</span>
          </>
        ): (
          "Reset Password"
        )}
   
      </button>
      </div>
      </form>
    </div>
    </div>
  
  
  </>;
};

export default ResetPassword;
