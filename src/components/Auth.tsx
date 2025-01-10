import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Camera,
  Mail,
  Lock,
  User,
  ArrowRight,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react";
import NightBg from "../assets/night-bg.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const base_url = "http://localhost:8080";
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("login") === "google-success") {
      toast.success("Login successful!");
      // Optionally, clear the query parameter to prevent repeated toasts
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  const backgroundImage = isDarkMode
    ? NightBg
    : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Signing in with:", formData);
      handleSignin();
    } else {
      console.log("Signing up with:", formData);
      handleSignup();
    }
  };

  const handleSignin = async () => {
    try {
      const payload = {
        usernameOrEmail: formData.email,
        password: formData.password,
      };
      const response = await axios.post(`${base_url}/auth/login`, payload);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setIsLogin(true);
        toast.success("Login Successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error Signing in the user.", error);
      toast.error("Invalid Credentials!");
    }
  };

  const handleSignup = async () => {
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(`${base_url}/auth/register`, payload);
      if (response.data.success) {
        toast.success("User Created Successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error creating the user.", error);
      toast.error("Error creating user!");
    }
  };

  const handleOAuth = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <>
      <ToastContainer
        className="max-w-[300px] ms-auto fixed right-0 top-4"
        position="top-right"
        autoClose={4000}
        limit={1}
      />
      <div
        className={`min-h-screen flex flex-col md:flex-row ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-110 transition-transform duration-200"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* Left Panel - Image/Brand */}
        <div className="md:w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>

          <div className="relative h-full p-8 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center gap-2">
                <Camera className="w-8 h-8 text-white" />
                <span className="text-white text-2xl font-bold">
                  Wanderlens
                </span>
              </div>
              <p className="text-white/90 mt-6 text-lg font-light">
                Capture your adventures. Share your story.
              </p>
            </div>

            <div>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                {isLogin ? "Welcome Back!" : "Start Your Journey"}
              </h2>
              <p className="text-white/90 font-light">
                Join our community of adventurers and photographers from around
                the world.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div
          className={`md:w-1/2 ${
            isDarkMode ? "bg-slate-900" : "bg-white"
          } p-8 flex items-center justify-center transition-colors duration-300`}
        >
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {isLogin ? "Sign in to your account" : "Create your account"}
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleAuth}>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="username"
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                        isDarkMode
                          ? "bg-slate-800 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="John Doe"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User
                        className={`h-5 w-5 ${
                          isDarkMode ? "text-gray-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {isLogin ? "Username / Email" : "Email Address"}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type={isLogin ? "text" : "email"}
                    required
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                      isDarkMode
                        ? "bg-slate-800 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={
                      isLogin ? "Username or Email Address" : "you@example.com"
                    }
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Mail
                      className={`h-5 w-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                      isDarkMode
                        ? "bg-slate-800 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Lock
                      className={`h-5 w-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className={`ml-2 block text-sm ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-emerald-500 hover:text-emerald-400"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
                  </span>
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </div>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-emerald-500 hover:text-emerald-400 flex items-center justify-center gap-1 mx-auto"
              >
                <ChevronLeft className="h-4 w-4" />
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`px-2 ${
                      isDarkMode
                        ? "bg-slate-900 text-gray-400"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-3 px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sky-500 ${
                    isDarkMode
                      ? "bg-slate-800 border-gray-700 text-white hover:bg-slate-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handleOAuth}
                >
                  <img
                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
