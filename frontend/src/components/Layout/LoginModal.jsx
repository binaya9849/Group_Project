import { useState, useEffect } from "react";
import { Mail, Lock, User, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleAuthPopup } from "../../store/slices/popupSlice";
import { forgotPassword, register, resetPassword, login } from "../../store/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {authUser, isSigningUp, isLoggingIn, isRequestingForToken} 
  = useSelector((state) => state.auth);
   const { isAuthPopupOpen } = useSelector((state) => state.popup);

   const [mode, setMode] = useState("signin"); //signin, signup, forgot, reset
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
   });

   //Detect reset Password URL and open popup with reset mode
    useEffect(() => {
      if (location.pathname.startsWith("/password/reset/")) {
        setMode("reset");
        dispatch(toggleAuthPopup());
      }
    }, [location.pathname, dispatch]);

    const handleSubmit = (e) => {
      e.preventDefault();

      const data = {
  email: formData.email,
  password: formData.password,
  ...(mode === "signup" && { name: formData.name }),
};
      

      if (mode === "forgot") {
        dispatch(forgotPassword({ email: formData.email })).then(() => {
          dispatch(toggleAuthPopup());
          setMode("signin");
          });
          return;

      }

      if (mode === "reset") {
          const token = location.pathname.split("/").pop();
        dispatch(resetPassword({ 
          token, 
          password: formData.password, 
          confirmPassword: formData.confirmPassword,
         })
        );
          return;
          
      }

      if (mode === "signup") {
        dispatch(register(data));
      } else {
        dispatch(login(data));
      }

      if (authUser) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

      }
 


    };
    if (!isAuthPopupOpen || authUser) return null;

    let isLoading = isLoggingIn || isSigningUp || isRequestingForToken; 




  return <>
    
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/*OVERLAY*/} 
        <div className="absolute inset-0 backdrop-blur-md bg-[hsla(var(--glass-bg))]"/>
        <div className="relative z-10 glass-panel w-full max-w-md animate-fade-in-up">
          {/*HEADER*/}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary text-center w-full">
              {mode === "signin" && "Welcome Back!"}
              {mode === "signup" && "Create an Account"}
              {mode === "forgot" && "Forgot Password"}
              {mode === "reset" && "Reset Password"}
            </h2>

            <button onClick={() => dispatch(toggleAuthPopup())} 
            className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth">
              <X className="h-5 w-5 text-primary" />
            </button>
          </div> 
          {/* AUTHENTICATION FORM*/}
              <form  onSubmit={handleSubmit} className="space-y-4">
                {/* FULL NAME - ONLY FOR SIGNUP */}
                {mode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                    text-muted-foreground"/>
                  
                    
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none"
                    required
              />
            </div>
          )}

          {/* EMAIL */}

          {mode !== "reset" && (
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
              text-muted-foreground"/>
                  
                    
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pe-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none"
                required
              />
            </div>
          )}

          {/* PASSWORD - ALWAYS VISIBLE EXCEPT FOR FORGOT PASSWORD */}
          {mode !== "forgot" && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                    text-muted-foreground"/>
                  
                    
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pe-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none"
                    required
              />
            </div>
          )}
          
          {/*  CONFIRM PASSWORD - ONLY VISIBLE EXCEPT FOR RESET PASSWORD */}
          {mode === "reset" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
              text-muted-foreground"/>
                  
                    
              <input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-transparent border 
                border-border placeholder:text-[hsla(var(--glass-text))] 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* FORGOT PASSWORD LINK*/ }
          {
            mode === "signin" && (
              <div className="text-right text-sm">
                <button type="button" onClick={() => setMode("forgot")}
                 className="text-primary animate-smooth hover:text-accent">
                  Forgot Password?
                </button>
              </div>
            )
          }

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={isLoading}
          className={`w-full py-3 gradient-primary flex justify-center items-center gap-2 
          text-primary-foreground rounded-lg font-semibold animated-smooth 
          ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:hover-on-glow"}`}
                      >{
              isLoading ? (<>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
              <span>{
              mode === "reset" ? 
              "Resetting Password..."
              :
              mode === "signup" ? 
              "Signing Up..." 
              : 
              mode === "forgot" ? 
              "Requesting for email..." 
              :
              "Logging In..."
               } {""}
               </span>
              </>
              ) : mode === "reset" ? (
                "Reset Password"
              ) : mode === "signup" ? (
                "Create Account") 
                : mode === "forgot" ? (
                "Request Reset Email"
              ) : (
                "Sign In"
              )
            }
          </button>
          </form>
            {/* MODE TOGGLE*/}
            {["signin", "signup"].includes(mode) && (
              <div className="mt-6 text-center">
                <button className="text-primary hover:text-accent animate-smooth"
                type="button" onClick={()=> {setMode(prev => prev === "signup" ? "signin" : "signup")}}>
                  {mode === "signup" ? "Already have an account? Sign In" 
                  : 
                  "Don't have an account? Sign Up"}
                </button>
              </div>
            )}



        </div>
      </div>
  
  
  
  </>;
};

export default LoginModal;
