import React from "react";
import {
  CSidebar,
  CSidebarNav,
  CNavItem,
  CSidebarToggler,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SideBar1 = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <CSidebar unfoldable className="vh-100 bg-black">
        <CSidebarNav>
          <div
            onClick={() => {
              navigate("/Admin");
            }}
          >
            <CNavItem className="bg-dark ">
              <i class="bi bi-bar-chart-fill mx-3 my-2"></i>
              <div>Admin</div>
            </CNavItem>
          </div>

          <div
            onClick={() => {
              navigate("/Engineer");
            }}
            className="text-decoration-none mt-3"
          >
            <CNavItem className="bg-dark">
              <i class="bi bi-house mx-3 my-2"></i>

              <div>Enginner</div>
            </CNavItem>
          </div>

          <div onClick={logout} className="mt-3">
            <CNavItem className="bg-dark">
              <i class="bi bi-box-arrow-left  mx-2  my-2"></i>
              <div>logout</div>
            </CNavItem>
          </div>
        </CSidebarNav>
        <CSidebarToggler />
      </CSidebar>
    </div>
  );
};

export default SideBar1;
