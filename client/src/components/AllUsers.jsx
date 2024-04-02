import React, { useState, useEffect } from "react";
import { AllUser, Teams } from "../hooks/FetchData";
import Search from "./Search";
import UserCard from "../elements/UserCard";
import Button from "react-bootstrap/Button";
import Filter from "./Filter";
import Modal from "react-bootstrap/Modal";
import AddUserCard from "../elements/AddUserCard";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function AllUsers() {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [page, setPage] = useState(1); // Initialize page state
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [avail, setAvail] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [addedUsers, setAddedUsers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, [page, fullName, domain, gender, avail]); // Fetch data when page or fullName changes

  const fetchData = async () => {
    try {
      const responseData = await AllUser(fullName, page); // Pass page number to the API request
      setData(responseData.users); // Replace the existing list with the new list
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const responseData = await Teams(); // Fetch teams data
        console.log(responseData);
        setTeams(responseData); // Update teams state with the fetched data
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    };

    fetchTeams(); // Call the fetchTeams function
  }, []);

  const handleChange = async (e) => {
    const fullName = e.target.value;
    setFullName(fullName); // Update fullName state
    setPage(1); // Reset page number to 1 when filtering
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilter = (e) => {
    const filterId = e.target.id;
    const filterValue = e.target.value;

    if (filterId === "domain") {
      setDomain(filterValue);
    } else if (filterId === "gender") {
      setGender(filterValue);
    } else if (filterId === "avail") {
      setAvail(filterValue);
    }
  };

  useEffect(() => {
    // Filter the data whenever any filter state changes
    const filteredData = data.filter((user) => {
      if (
        (domain === "" || user.domain === domain) &&
        (gender === "" || user.gender === gender) &&
        (avail === "" || `${user.available}` === avail)
      ) {
        return true;
      }
      return false;
    });
    setFilteredData(filteredData);
  }, [data, domain, gender, avail]);

  const addUserToTeam = (user) => {
    // Check if the user is available and its domain is unique in the added users list
    if (
      user.available &&
      !addedUsers.some((addedUser) => addedUser.domain === user.domain)
    ) {
      setAddedUsers([...addedUsers, user]);
    } else {
      // Display an alert if the user is not available or its domain is not unique
      alert("Cannot add user: User is not available or domain is not unique");
    }
  };

  const renderUsers = () => {
    return filteredData.map((user) => (
      <AddUserCard
        key={user._id}
        id={user.id}
        fname={user.first_name}
        lname={user.last_name}
        email={user.email}
        gender={user.gender}
        avatar={user.avatar}
        domain={user.domain}
        available={user.available}
        added={addedUsers.some((addedUser) => addedUser.id === user.id)}
        onAddUser={addUserToTeam}
        user={user}
      />
    ));
  };

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const createTeam = async () => {
    try {
      // Prepare the data to be sent in the POST request
      const teamData = {
        name: teamName,
        users: addedUsers.map((user) => user.id),
      };

      // Make the POST request to create the team
      const response = await axios.post(
        "http://localhost:3000/api/teams",
        teamData
      );

      // Log the response from the server
      console.log("Team created successfully:", response.data);

      // Reset addedUsers state
      setAddedUsers([]);

      // Close modal
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating team:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  const paginateUsers = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return renderUsers().slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="teams-container">
        {teams.map((i) => {
          return (
            <div className="team-box">
              <div
                className="title"
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "x-large",
                  fontFamily: "cusive",
                }}
              >
                <b> {i.name} </b>
              </div>
              <div className="team-carousel" style={{ color: "white" }}>
                {i.users.map((c) => {
                  console.log(c);
                  const fil = data.find((z) => z.id === c);
                  console.log("fil", fil);

                  if (fil) {
                    console.log("fil", fil.id);
                    return (
                      <UserCard
                        key={fil._id}
                        id={fil.id}
                        fname={fil.first_name}
                        lname={fil.last_name}
                        email={fil.email}
                        gender={fil.gender}
                        avatar={fil.avatar}
                        domain={fil.domain}
                        available={fil.available}
                      />
                    );
                  } else {
                    console.log("User not found for id:", c);
                    return null; // or some placeholder component
                  }
                })}
              </div>
            </div>
          );
        })}
        <Button
          variant="outline-success"
          onClick={handleShow}
          style={{ margin: "20px", fontSize: "larger" }}
        >
          Add a team
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Select Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Search onChange={handleChange} />
          <Filter onChange={handleFilter} />
          <div className="user-line">{paginateUsers()}</div>
          <div className="pagination">
            {page > 2 && (
              <Button
                onClick={() => handlePageChange(page - 2)}
                disabled={page < 2}
              >
                {page - 2}
              </Button>
            )}
            {page !== 1 && (
              <Button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                {page - 1}
              </Button>
            )}
            <Button variant="secondary">{page}</Button>
            <Button onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </Button>
            <Button onClick={() => handlePageChange(page + 2)}>
              {page + 2}
            </Button>
          </div>
          <Form.Control
            type="text"
            placeholder="Team Name"
            style={{ margin: "10px 5px" }}
            onChange={handleTeamName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={createTeam}
            disabled={addedUsers.length === 0}
          >
            Create A team
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
