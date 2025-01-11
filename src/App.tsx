import Auth from "./components/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const notifySuccess = (msg: String) => {
    toast.success(msg);
  };
  const notifyError = (msg: String) => {
    toast.error(msg);
  };
  return (
    <Router>
      <div className="min-h-screen">
        <ToastContainer
          className="max-w-[300px] ms-auto fixed right-0 top-4"
          position="top-right"
          autoClose={4000}
          limit={1}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Auth
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                notifySuccess={notifySuccess}
                notifyError={notifyError}
              />
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <ResetPassword
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                notifySuccess={notifySuccess}
                notifyError={notifyError}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
