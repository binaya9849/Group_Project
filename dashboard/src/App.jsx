import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Products from "./components/Products";

function App() {

<<<<<<< HEAD
  const {openedComponent}  = useSelector((state) => state.extra);
  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };
=======
  const { openedComponent } = useSelector(state => state.extra);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
          <Dashboard/>
        break;
      case "Orders":
          <Orders/>
        break;
      case "Users":
          <Users/>
        break;
      case "Profile":
          <Profile/>
        break;
      case "Products":
          <Products/>
        break;

      default:
        return <Dashboard />;
    }
     
>>>>>>> 810d088b0b247c480c10d470d79b5c05060d2410


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Protected Admin Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen">
                <SideBar />
                {renderDashboardContent()}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
}

export default App;
