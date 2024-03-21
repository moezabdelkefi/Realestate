import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
 
  const toggle = () => {
    setOpen(!open);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
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
      // Appel à l'API pour obtenir le token JWT
      const res = await axios.post("http://localhost:8000/userAuth/api/login", {
        email: email,
        password: password
      });
      const userRole = res.data.role;
      // Redirection basée sur le rôle de l'utilisateur
      if (userRole === 'user') {
        // Rediriger vers localhost:3000 pour les utilisateurs réguliers
        navigate("/");
      } else if (userRole === 'agent' || userRole === 'admin') {
        // Rediriger vers localhost:5173 pour les agents et les administrateurs
        window.location.href = "http://localhost:5173/";
      } else {
        // En cas de rôle non défini ou inconnu, afficher un message d'erreur
        toast.error("Invalid user role. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  
  
  const forgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {

        navigate("/ForgetPasswordPage");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const responseGoogleSuccess = (response) => {
    console.log(response);
    // handle successful Google login here
  }

  const responseGoogleFailure = (error) => {
    console.error(error);
    // handle failed Google login here
  }

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("http://localhost:8000/api/google/login/", {
        access_token: response.accessToken,
      });
      console.log(res.data);
      window.location.href = "http://localhost:5173/";
    } catch (error) {
      console.error("Erreur de connexion avec Google:", error);
    }
  };
  const isAuthenticated = true;
  const reachGoogle = () => {
    const clientID = "53218872031-vv5sjci0ljkm8vhqrkg80168uf8cgsns.apps.googleusercontent.com";
    const callBackURL = "http://localhost:3000/";
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURL}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`);

  }
  return (
    <div className="h-screen flex items-center justify-center relative">
      <img src="/images/homelogin.jpeg" alt="Login Background" className="absolute inset-0 w-full h-full object-cover z-[-1]" />
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
              onChange={handleEmail}
              className="mt-1 p-2 text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
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
                onChange={handlePassword}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type={open ? "text" : "password"}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 top-6">
                {open ? (
                  <AiFillEye onClick={toggle} />
                ) : (
                  <AiFillEyeInvisible onClick={toggle} />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">

            </div>

            <div className="text-sm">
              <button
                onClick={forgetPassword}
                className="font-medium text-primary hover:text-primary-dark focus:outline-none"
                type="button"
              >
                <Link to="/ForgetPasswordPage" className="font-medium text-primary hover:text-primary-dark focus:outline-none">
                  Forgot your password?
                </Link>
              </button>
            </div>
          </div>
          <br />
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="bg-orange-500 font-bold hover:bg-orange-500 text-white rounded p-4 text-sm w-full transition"
            >
              Login
            </button>
            <button onClick={reachGoogle} className="bg-white text-black hover:text-gray-800 hover:bg-gray-100 font-bold py-2 px-4 rounded inline-flex items-center justify-center w-full">
              <FcGoogle className="mr-2" />
              <span className="flex items-center">Sign in with Google</span>
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
