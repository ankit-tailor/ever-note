import React, { useState } from "react";
import "../Authentication/Authentication.css";
import { projectAuth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      projectAuth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      projectAuth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className="login-form">
      <h1>Welcome to Ever Note, </h1>
      <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
      <div className="form">
        <p> </p>
        <form className="auth-form" onSubmit={handelSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</button>
          <button
            onClick={() => {
              setEmail("tester@test.com");
              setPassword("123456");
            }}
          >
            Test Login
          </button>
        </form>
        {isSignIn ? (
          <p style={{ color: "black" }}>
            New user ?{" "}
            <span
              style={{
                color: "#03203c",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                setIsSignIn(false);
                setEmail("");
                setPassword("");
              }}
            >
              Register
            </span>
          </p>
        ) : (
          <p style={{ color: "black" }}>
            <span
              style={{
                color: "#03203c",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                setIsSignIn(true);
                setEmail("");
                setPassword("");
              }}
            >
              Sing In
            </span>
          </p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Authentication;
