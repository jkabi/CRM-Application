import React from "react";

import MaterialTable from "material-table";

import { useState, useEffect } from "react";
import SideBar1 from "../component/SideBar1";

import StatusDashBoard from "../component/StatusDashBoard";
import { getalluser } from "../api/User";

import ModalTicket from "../component/ModalTicket";
const Admin = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchticket();
  }, []);

  const fetchticket = () => {
    getalluser().then((res) => {
      console.log(res.data);
      setusers(res.data);
    });
  };

  return (
    <div>
      <div className="row  bg-light">
        <div className="col-1">
          {" "}
          <SideBar1 />
        </div>
        <StatusDashBoard />

        <div style={{ maxWidth: "100%" }} className="col-10 mx-auto">
          <MaterialTable
            columns={[
              { title: "USERID", field: "userId" },
              { title: "NAME", field: "name" },
              { title: "Email ", field: "email" },
              { title: "ROLL ", field: "userTypes" },
              { title: "STATUS ", field: "userStatus" },
            ]}
            options={{
              // filtering: true,
              sorting: true,

              rowStyle: {
                backgroundColor: "gray",
              },
            }}
            data={users}
            title="USER RECORDS"
          />
        </div>
        <ModalTicket />
      </div>
    </div>
  );
};

export default Admin;
