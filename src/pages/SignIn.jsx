import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword((prev) => !prev);
    };
  
    const handleEmailChange = (e) => {
      if (e && e.target) {
        setEmail(e.target.value);
      }
    };
  
    const handlePasswordChange = (e) => {
      if (e && e.target) {
        setPassword(e.target?.value);
      }
    };
  
    const handleConfirmPassword = (e) => {
      if (e && e.target) {
        setConfirmPassword(e.target.value);
      }
      //console.log(password)
    };
  
    const handleSignIn = async (e) => {
      e.preventDefault();
  
      if (!email || !password || !confirmPassword) {
        toast.error("Please fill in all the fields");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          confirmPassword
        );
        toast.success("Your account is created");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        toast.error("Error creating account:");
      
      }
    };
  
   
  
    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.profileObj;
            setValue(user.email);
            localStorage.setItem('email', user.email);
            toast.error("Your account is not created");
        })
        .catch((error) => { 
            // console.error('Error signing in with Google:', error.code, error.message);
            toast.success("Your account is created");
            setTimeout(() => {
              navigate("/");
            }, 2000);
        });
    };
  
    return (
      <React.Fragment>
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: 'url("/images/singin.jpeg")' }}
        >
          <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 p-2 w-full text-black block rounded-md border border-gray-300 focus:ring-primary focus:border-primary"
                  placeholder="Email address"
                  onInput={handleEmailChange}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="mt-1 p-2 w-full block rounded-md border border-gray-300 focus:ring-primary focus:border-primary"
                  placeholder="Password"
                  onInput={handlePasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 top-5">
                  {showPassword ? (
                    <AiFillEye onClick={togglePasswordVisibility} />
                  ) : (
                    <AiFillEyeInvisible onClick={togglePasswordVisibility} />
                  )}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="confirm password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm password"
                  name="confirm password"
                  autoComplete="current-password"
                  className="mt-1 p-2 w-full block rounded-md border border-gray-300 focus:ring-primary focus:border-primary"
                  placeholder="Confirm Password"
                  onInput={handleConfirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 top-5">
                  {showConfirmPassword ? (
                    <AiFillEye onClick={toggleConfirmPasswordVisibility} />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="bg-orange-500 font-bold hover:bg-orange-500 text-white rounded p-4 text-sm w-full transition "
                >
                  Sign in
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleLoginWithGoogle}
                  className="border border-orange-500 hover:border-orange-500 text-orange-500 rounded p-4 text-sm w-full transition cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg  w-full flex items-center justify-center gap-2"
                >
                  <FcGoogle className="mr-2" />
                  Sign in with Google
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </React.Fragment>
    );
  };
export default SignIn;
