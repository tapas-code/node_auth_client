import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Camera, Lock, ArrowRight, Sun, Moon, ChevronLeft } from "lucide-react";
import NightBg from "../assets/night-bg.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../utils/api";

type ResetPasswordProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  notifySuccess: (msg: String) => void;
  notifyError: (msg: String) => void;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({
  isDarkMode,
  setIsDarkMode,
  notifySuccess,
  notifyError
}) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    verifyPassword: "",
  });
  const [matchError, setMatchError] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const { newPassword, verifyPassword } = formData;
    if (newPassword && verifyPassword) {
      setMatchError(newPassword !== verifyPassword);
    } else {
      setMatchError(false);
    }
  }, [formData]);

  const backgroundImage = isDarkMode
    ? NightBg
    : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/auth/reset-password/${token}`, { password: formData.newPassword });
      notifySuccess("Password reset successful!");
      navigate("/");
    } catch (error) {
      notifyError("Error occurred.");
    }
  };

  return (
    <>
      
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
        <div className="md:w-1/2 max-md:min-h-[40vh] relative overflow-hidden">
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
              <p className="text-white/90 mt-2 text-lg font-light">
                Capture your adventures. Share your story.
              </p>
            </div>

            <div className="max-md:mt-40">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                Reset Password!
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
                Reset your password
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label
                  htmlFor="newPassword"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                      isDarkMode
                        ? "bg-slate-800 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="••••••••"
                    value={formData.newPassword}
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
              <div>
                <label
                  htmlFor="verifyPassword"
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Verify Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="verifyPassword"
                    name="verifyPassword"
                    type="password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${
                      isDarkMode
                        ? "bg-slate-800 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="••••••••"
                    value={formData.verifyPassword}
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

              {matchError ? (
                <p className="text-red-500">Password do not match.</p>
              ) : (
                <></>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
                  </span>
                  Reset
                </button>
              </div>
            </form>
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-emerald-500 hover:text-emerald-400 flex items-center justify-center gap-1 mx-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              Remeber your password? Sign In
            </button>
          </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ResetPassword;
