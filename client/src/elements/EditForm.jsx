import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Attr } from "../hooks/FetchData";

export default function EditForm({
  handleUpdateSubmit,
  email,
  id,
  fname,
  lname,
  domain,
  gender,
  available,
  setShowEdit,
}) {
  const [Domain, setDomain] = useState([]);
  const [Gender, setGender] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      domain: e.target.elements.domain.value,
      email: e.target.elements.email.value,
      available: e.target.elements.avail.value,
    };
    console.log(updatedUserData);
    setShowEdit(false);
    handleUpdateSubmit(updatedUserData);
  };

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
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="first-name">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={fname} disabled />
          </Form.Group>
          <Form.Group as={Col} controlId="last-name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={lname} disabled />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" defaultValue={email} />
        </Form.Group>
        <Row className="mb-3" style={{ width: "80%" }}>
          <Form.Group as={Col} controlId="domain">
            <Form.Label>Domain</Form.Label>
            <Form.Select defaultValue={domain}>
              <option disabled>Choose Domain</option>
              {Domain.map((c, index) => (
                <option key={index}>{c}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select defaultValue={gender} disabled>
              <option disabled>Choose Gender</option>
              {Gender.map((c, index) => (
                <option key={index}>{c}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="avail">
            <Form.Label>Available</Form.Label>
            <Form.Select defaultValue={available}>
              <option disabled value="">
                Available
              </option>
              <option>true</option>
              <option>false</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
