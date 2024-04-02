import React, { useRef, useState } from "react";
import "./Card.css";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { DeleteUser, UpdateUser } from "../hooks/FetchData";
import Modal from "react-bootstrap/Modal";
import EditForm from "./EditForm";

export default function UserCard({
  id,
  fname,
  lname,
  email,
  gender,
  avatar,
  domain,
  available,
  fetchData,
}) {
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const target = useRef(null);
  const target1 = useRef(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setShowEdit(true);
    setShow1(false);
  };

  const deleteUser = async () => {
    try {
      await DeleteUser(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
    setShow1(false);
  };

  const handleUpdateSubmit = async (updatedUserData) => {
    try {
      await UpdateUser(id, updatedUserData);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <div class="card-container">
        <div className="head">
          <img class="round" src={avatar} alt="user" />
        </div>
        <span class="proId">{available ? "A" : "NA"}</span>
        <span class="pro">{id}</span>
        <div className="detail">
          <h5>
            {fname} {lname}
          </h5>
          <p>{domain}</p>
        </div>

        <div class="buttons">
          <button class="primary" ref={target1} onClick={() => setShow(!show)}>
            Email
          </button>
          <Overlay target={target1.current} show={show} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                {email}
              </Tooltip>
            )}
          </Overlay>
          <button class="primary ghost">{gender}</button>
          <Button
            variant="outline-primary"
            ref={target}
            onClick={() => setShow1(!show1)}
          >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Overlay target={target.current} show={show1} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                <Button variant="danger" onClick={handleShowDelete}>
                  Delete
                </Button>
                <Button variant="success" onClick={handleShowEdit}>
                  Edit
                </Button>
              </Tooltip>
            )}
          </Overlay>
          <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Deleting the User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to Delete User {fname} {lname}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                No
              </Button>
              <Button variant="danger" onClick={deleteUser}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEdit} onHide={handleCloseEdit} animation={true}>
            <Modal.Header closeButton>
              <Modal.Title>Update the User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <EditForm
                handleUpdateSubmit={handleUpdateSubmit}
                email={email}
                id={id}
                fname={fname}
                lname={lname}
                domain={domain}
                gender={gender}
                available={available}
                setShowEdit={setShowEdit}
              />{" "}
            </Modal.Body>
           
          </Modal>
        </div>
      </div>
    </div>
  );
}
