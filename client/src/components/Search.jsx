import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Search({ onChange }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InputGroup className="mb-3" style={{ width: "75%" }}>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={onChange}
          placeholder="Search for the Users"
        />
      </InputGroup>
    </div>
  );
}
