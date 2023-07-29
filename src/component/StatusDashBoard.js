import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useState, useEffect } from "react";
import { countofticket } from "../api/Ticket";

const StatusDashBoard = () => {
  const [ticketcount, setticketcount] = useState({});
  const UserName = localStorage.getItem("name");
  useEffect(() => {
    fetchticket();
  }, []);
  const fetchticket = () => {
    const data = {
      OPENED: 0,
      CLOSED: 0,
      BLOCKED: 0,
      PROGRESS: 0,
    };
    countofticket()
      .then((res) => {
        // console.log(res.data);

        res.data.forEach((element) => {
          // console.log(element.status);
          // console.log(element.status === "OPEN");
          if (element.status === "OPEN") {
            data.OPENED += 1;
          } else if (element.status === "OPENED") {
            data.OPENED += 1;
          } else if (element.status === "CLOSED") {
            data.CLOSED += 1;
          } else if (element.status === "COMPLETED") {
            data.BLOCKED += 1;
          } else if (element.status === "PROGRESS") {
            data.PROGRESS += 1;
          } else if (element.status === "BLOCKED") {
            data.BLOCKED += 1;
          }
        });
        setticketcount(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-10  ">
      <div className="container text-center m-3">
        <div>
          <h1 className="text-primary">Welcome ,{UserName}</h1>
          <p className="text-muted">Tahe a quick look at your stack</p>
        </div>
      </div>
      <div className="row text-center ">
        <div className="col-sm-12 col-md-6 col-lg-3 my-2 ">
          <div
            style={{
              backgroundColor: "purple ",
              color: "white",
            }}
            className="card rounded p-2 "
          >
            <div className="card-body ">
              <div className="">
                <p className="h5">
                  {" "}
                  <i class="bi bi-pencil me-2"></i>Open
                </p>
                <hr></hr>
              </div>
              <div className=" row">
                <div className="col  ">
                  <h1>{ticketcount.OPENED}</h1>
                </div>
                <div className="col">
                  <div style={{ width: 40, height: 40 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        pathColor: "red",
                      })}
                      value={ticketcount.OPENED}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 my-2 ">
          <div
            style={{
              backgroundColor: "green ",
              color: "white",
            }}
            className="card rounded p-2 "
          >
            <div className="card-body ">
              <div className="">
                <p className="h5">
                  {" "}
                  <i class="bi bi-lightning-charge me-2"></i>Progress
                </p>
                <hr></hr>
              </div>
              <div className=" row">
                <div className="col  ">
                  <h1>{ticketcount.PROGRESS}</h1>
                </div>
                <div className="col">
                  <div style={{ width: 40, height: 40 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        pathColor: "	#FFA500",
                      })}
                      value={ticketcount.PROGRESS}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 my-2 ">
          <div
            style={{
              backgroundColor: "skyblue ",
              color: "white",
            }}
            className="card rounded p-2 "
          >
            <div className="card-body ">
              <div className="">
                <p className="h5">
                  {" "}
                  <i class="bi bi-check-circle me-2"></i>close
                </p>
                <hr></hr>
              </div>
              <div className=" row">
                <div className="col  ">
                  <h1>{ticketcount.CLOSED}</h1>
                </div>
                <div className="col">
                  <div style={{ width: 40, height: 40 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        pathColor: "blue",
                      })}
                      value={ticketcount.CLOSED}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 my-2 ">
          <div
            style={{
              backgroundColor: "gray ",
              color: "white",
            }}
            className="card rounded p-2 "
          >
            <div className="card-body ">
              <div className="">
                <p className="h5">
                  {" "}
                  <i class="bi bi-slash-circle me-2"></i>Blocked
                </p>
                <hr></hr>
              </div>
              <div className=" row">
                <div className="col  ">
                  <h1>{ticketcount.BLOCKED}</h1>
                </div>
                <div className="col">
                  <div style={{ width: 40, height: 40 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        pathColor: "#FFA500",
                      })}
                      value={ticketcount.BLOCKED}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDashBoard;
