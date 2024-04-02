import React, { useRef, useState } from "react";
import "./Card.css";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

export default function AddUserCard({
  id,
  fname,
  lname,
  email,
  gender,
  avatar,
  domain,
  available,
  added,
  onAddUser,
  user,
}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const handleAddUser = () => {
    onAddUser(user);
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
          <button class="primary" ref={target} onClick={() => setShow(!show)}>
            Email
          </button>
          <Overlay target={target.current} show={show} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                {email}
              </Tooltip>
            )}
          </Overlay>
          <button class="primary ghost">{gender}</button>
        </div>
        <div className="add">
          <button className="primary" disabled={added} onClick={handleAddUser}>
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
