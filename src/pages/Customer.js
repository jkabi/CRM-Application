import React from "react";
import SideBar1 from "../component/SideBar1";

const Customer = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="row">
      <SideBar1 />
      <div className="text-center">welcome</div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Customer;
