import axios from "axios";
import { Mail, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../utils/api";

type FPModalProps = {
  setFPModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FPModal: React.FC<FPModalProps> = ({ setFPModalOpen }) => {
  const [email, setEmail] = useState("");
  const handleSendResetLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/auth/forget-password`, { email });
      toast.success("Reset Link Sent.");
      setFPModalOpen(false);
    } catch (error) {
      toast.error("Error occurred.");
      console.error(error);
    }
  };
  return (
    <div className="relative">
      <div className="w-[24rem] max-sm:w-[90vw] bg-white text-black h-auto px-8 py-6 rounded-lg shadow-lg flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold text-center">Forget Password?</h1>
        <p className="text-xs text-center">
          Enter your email to get the reset link.
        </p>

        <form onSubmit={handleSendResetLink}>
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mt-4 text-gray-700
            `}
            >
              {"Email Address"}
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                  bg-white border-gray-300 text-gray-900
              `}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Mail
                  className={`h-5 w-5 text-gray-400
                `}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-sky-500/80 text-white hover:bg-sky-500 font-semibold rounded-lg mt-4 active:scale-[98%] transition-all duration-100"
          >
            Send Reset Link
          </button>
        </form>
      </div>

      <div
        className="absolute -top-3 -right-3 bg-red-400 p-2 rounded-full cursor-pointer hover:bg-red-500"
        onClick={() => setFPModalOpen(false)}
      >
        <X />
      </div>
    </div>
  );
};

export default FPModal;
