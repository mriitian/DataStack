import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Attr } from "../hooks/FetchData";

export default function Filter({ onChange }) {
  const [domain, setDomain] = useState([]);
  const [gender, setGender] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when page changes

  const fetchData = async () => {
    try {
      const responseData = await Attr();
      setDomain(responseData.domain);
      setGender(responseData.gender);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row className="mb-3" style={{ width: "80%" }}>
        <Form.Group as={Col} controlId="domain">
          <Form.Select defaultValue="Choose Domain" onChange={onChange}>
            <option disabled>Choose Domain</option>
            {domain.map((c, index) => (
              <option key={index}>{c}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="gender" onChange={onChange}>
          <Form.Select defaultValue="Choose Gender">
            <option disabled>Choose Gender</option>
            {gender.map((c, index) => (
              <option key={index}>{c}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="avail" onChange={onChange}>
          <Form.Select defaultValue="">
            <option disabled value="">
              Available
            </option>
            <option>true</option>
            <option>false</option>
          </Form.Select>
        </Form.Group>
      </Row>
    </div>
  );
}
