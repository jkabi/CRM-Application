// for all CUSTOMER  , admin and ENGINEER
import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { signupdata, signindata } from "../api/Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [showsignup, setshowsignup] = useState(false);
  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userType, setuserType] = useState("CUSTOMER");
  const [message, setmessage] = useState("");
  const [error, seterror] = useState(false);
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("accessToken");
    if (!userType || !token) {
      return;
    } else {
      if (userType === "CUSTOMER") {
        navigate("/Customer");
      } else if (userType === "ENGINEER") {
        navigate("/Engineer");
      } else {
        navigate("/Admin");
      }
    }
  }, []);

  const togglesignup = (e) => {
    e.preventDefault();
    setshowsignup(!showsignup);
    clearstate();
  };

  const Loginwithdata = (e) => {
    e.preventDefault();
    const data = {
      userId: userId,
      password: password,
    };
    if (name.length > 12) {
      seterror(true);
      setmessage("name must be greater than 5 to 10");
      return;
    } else if (password.length < 5 || password.length > 12) {
      seterror(true);
      setmessage("password must be strong");
      return;
    }

    signindata(data)
      .then((response) => {
        console.log(response);

        seterror(false);
        setmessage("Login Successfully");
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("accessToken", response.data.accessToken);

        checkpage(response.data.userType);
      })
      .catch((err) => {
        seterror(true);
        setmessage(err.response.data.message);
      });
    clearstate();
  };
  const checkpage = (res) => {
    if (res === "CUSTOMER") {
      window.location.href = "/Customer";
    } else if (res === "ENGINEER") {
      window.location.href = "/Engineer";
    } else {
      window.location.href = "/Admin";
    }
  };
  const signupwithdata = (e) => {
    e.preventDefault();
    const data = {
      userId: userId,
      name: name,
      email: email,
      password: password,
      userType: userType,
    };
    console.log(data);

    clearstate();

    if (name.length > 12) {
      seterror(true);
      setmessage("name must be greater than 5 to 10");
      return;
    } else if (password.length < 7 || password.length > 12) {
      seterror(true);
      setmessage("password must be strong");
      return;
    }

    signupdata(data)
      .then((response) => {
        console.log(response);
        seterror(false);
        setmessage("SignUp successfully");
        setshowsignup(!setshowsignup);
      })
      .catch((error) => {
        if (error.response.status) {
          seterror(true);
          setmessage(error.response.data.message);
        }
      });
  };

  const updateform = (e) => {
    const ID = e.target.id;
    if (ID === "userId") {
      setuserId(e.target.value);
    } else if (ID === "name") {
      setname(e.target.value);
    } else if (ID === "email") {
      setemail(e.target.value);
    } else if (ID === "password") {
      setpassword(e.target.value);
    } else if (ID === "userType") {
      setuserType(e.target.title);
    }
  };
  const clearstate = () => {
    setuserId("");
    setname("");
    setemail("");
    setpassword("");
    setuserType(userType);
    seterror(false);
    setmessage("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100  bg-info ">
      <div
        class="card p-3 rounded shadow-lg text-center"
        style={{ width: 30 + "rem" }}
      >
        <h2 className=" text-info"> {showsignup ? "Sign up" : "Log in"} </h2>
        <form onSubmit={showsignup ? signupwithdata : Loginwithdata}>
          <div>
            <div className="input-group">
              <input
                id="userId"
                type="text"
                className="form-control m-1"
                placeholder="userId"
                value={userId}
                onChange={updateform}
              />
            </div>
            {showsignup && (
              <>
                <div className="input-group">
                  <input
                    id="name"
                    type="text"
                    className="form-control m-1"
                    placeholder="name"
                    value={name}
                    onChange={updateform}
                  />
                </div>
                <div className="input-group">
                  <input
                    id="email"
                    type="email"
                    className="form-control m-1"
                    placeholder="email"
                    value={email}
                    onChange={updateform}
                  />
                </div>
              </>
            )}
            <div className="input-group">
              <input
                id="password"
                type="text"
                className="form-control m-1"
                placeholder="password"
                value={password}
                onChange={updateform}
              />
            </div>
            {showsignup && (
              <>
                <DropdownButton
                  id="userType"
                  title={userType}
                  onChange={updateform}
                >
                  <Dropdown.Item
                    eventKey="CUSTOMER "
                    onClick={() => setuserType("CUSTOMER")}
                  >
                    CUSTOMER
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="ENGINEER "
                    onClick={() => setuserType("ENGINEER")}
                  >
                    ENGINEER
                  </Dropdown.Item>
                </DropdownButton>
              </>
            )}

            <div className="input-group">
              <input
                type="Submit"
                className="form-control btn btn-info m-1 text-white"
                value={showsignup ? "Sign up" : "Log In"}
              />
            </div>

            <div className="text-info m-1" onClick={togglesignup}>
              {showsignup
                ? "Already have an account? log In"
                : "Dont have an account? sign up"}
            </div>
            <div className={error ? "text-danger" : "text-success"}>
              {message}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
