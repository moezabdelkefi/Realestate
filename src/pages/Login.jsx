import {React , useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import { signInWithPopup } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
const Login = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
  
    const toggle = () => {
      setOpen(!open);
    };
  
    const handleEmail = (e) => {
      if (e && e.target) {
        setEmail(e.target.value);
      }
    };
  
    const handlePassword = (e) => {
      if (e && e.target) {
        setPassword(e.target?.value);
      }
      //console.log(password)
    };
  
    // const handleLogin = async (e) => {
    //   e.preventDefault();
    //   if (!email || !password) {
    //     toast.error("Please fill in all the fields");
    //     return;
    //   }
    //   try {
    //     await signInWithEmailAndPassword(auth, email, password);
    //     toast.success("Login successful.");
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 2000);
    //   } catch (err) {
    //     console.error(err);
    //     toast.error("Login failed. Please check your credentials.");
    //   }
    // };

    const handleCreateAccount = () => {
        window.location.href = "/SignIn"; 
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please fill in all the fields");
        return;
      }
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful.");
        localStorage.setItem('user', JSON.stringify({ email }));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Login failed. Please check your credentials.");
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
    

        const forgetPassword = () => {
            sendPasswordResetEmail(auth, email)
              .then(() => {
                alert('Password reset email sent');
              })
              .catch((error) => {
                //  alert(error);
              });
          }

    return (
        <div className="h-screen flex items-center justify-center relative">
          <img
            src="/images/homelogin.jpeg"
            alt="Login Background"
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
          />
          <div className="border-20 border-gray-500 p-20 rounded-md bg-white flex flex-col items-center justify-center relative z-[1]">
            <h2 className="font-semibold text-black text-4xl font-bold mb-7">
              Log in
            </h2>
            <form className="w-64" onSubmit={handleLogin}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail Address
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  onInput={handleEmail}
                  className=" mt-1 p-2 text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    placeholder="Password"
                    onInput={handlePassword}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    type={open === false ? "password" : "text"}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 top-6">
                    {open === true ? (
                      <AiFillEye onClick={toggle} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggle} />
                    )}
                  </div>
                </div>
              </div>
    
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
    
                <div className="text-sm">
                  <button 
                   onClick={forgetPassword} 
                  className="font-medium text-primary hover:text-primary-dark focus:outline-none">
                    Forgot your password?
                  </button>
                </div>
              </div>
             <br/> 
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  className="bg-orange-500 font-bold hover:bg-orange-500 text-white rounded p-4 text-sm w-full transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleLoginWithGoogle}
                  className="border border-orange-500 hover:border-orange-500 text-orange-500 rounded p-4 text-sm w-full transition cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg  w-full flex items-center justify-center gap-2"
                >
                  <FcGoogle/>
                  Log in with Google
                </button>
              </div>
            </form>
            <p className="text-sm mt-4 text-black font-bold">
              Don't have an account?{" "}
              <button onClick={handleCreateAccount} className="text-primary">
                Create Account
              </button>
              .
            </p>
          </div>
          <ToastContainer />
        </div>
      );
    };
export default Login;
