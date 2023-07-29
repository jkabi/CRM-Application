import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getallticket } from "../api/Ticket";
import React from "react";
import MaterialTable from "material-table";
import { Update } from "@material-ui/icons";
const ModalTicket = () => {
  const [show, setShow] = useState(false);
  const [ticketdetails, setticketdetails] = useState([]);
  let [selectedTicket, setselectedTicket] = useState({});
  const [title, settitle] = useState("");
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchticket();
  }, []);

  const fetchticket = () => {
    getallticket()
      .then((response) => {
        console.log(response.data);
        setticketdetails(response.data);
        console.log("get ticket success");
      })
      .catch((error) => {
        // console.log(error.message);
        // console.log(error.response.data.message);
        console.log("get ticket failed");
      });
  };
  const editdata = (rowData) => {
    console.log(rowData);
    setShow(true);
    setselectedTicket(rowData);
  };
  const onchangeupdate = (e) => {
    const fieldname = e.target.name;
    if (fieldname === "title") {
      selectedTicket.title = e.target.value;
    } else if (fieldname === "description") {
      selectedTicket.description = e.target.value;
    } else if (fieldname === "assignee") {
      selectedTicket.assignee = e.target.value;
    } else if (fieldname === "status") {
      selectedTicket.status = e.target.value;
    } else if (fieldname === "ticketPriority")
      selectedTicket.ticketPriority = e.target.values;

    setselectedTicket({ ...selectedTicket });
  };
  const UpdateTicket = () => {};
  return (
    <>
      <div style={{ maxWidth: "100%" }} className="col-10 mx-auto">
        <MaterialTable
          onRowClick={(event, rowData) => editdata(rowData)}
          columns={[
            { title: "TICKET ID", field: "_id" },
            { title: "TITLE", field: "title" },
            { title: "DESCRIPTION ", field: "description" },
            { title: "REQUESTOR ", field: "requestor" },
            { title: "STATUS ", field: "userStatus" },
            { title: "PRIORITY ", field: "ticketPriority" },
            { title: "ASSIGNEE ", field: "assignee" },
            { title: "STATUS ", field: "status" },
          ]}
          options={{
            // filtering: true,
            sorting: true,

            rowStyle: {
              // backgroundColor: "gray",
              cursor: "pointer",
            },
          }}
          data={ticketdetails}
          title="TICKET RECORDS"
        />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Ticket id : {selectedTicket._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={selectedTicket.title}
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={onchangeupdate}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>assignee</Form.Label>
                <Form.Control
                  value={selectedTicket.assignee}
                  type="text"
                  name="assignee"
                  placeholder="assignee"
                  onChange={onchangeupdate}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>status</Form.Label>
                <Form.Control
                  value={selectedTicket.status}
                  type="text"
                  name="status"
                  placeholder="status"
                  onChange={onchangeupdate}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ticketPriority</Form.Label>
                <Form.Control
                  value={selectedTicket.ticketPriority}
                  type="text"
                  name="ticketPriority"
                  placeholder="ticketPriority"
                  onChange={onchangeupdate}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={selectedTicket.description}
                  onChange={onchangeupdate}
                  rows={4}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onSubmit={UpdateTicket}>
              UpdateTicket
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalTicket;
