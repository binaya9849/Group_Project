function App() {
  const { openedComponent } = useSelector((state) => state.extra);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Profile":
        return <Profile />;
      case "Products":
        return <Products />;
      default:
        return <Dashboard />;
    }
  };

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
<<<<<<< HEAD
}
=======
}

export default App;
>>>>>>> 072a69ebe75979ab4f7d1cacf3b80406473f30de
