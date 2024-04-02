import React, { useState, useEffect } from "react";
import { AllUser, Teams } from "../hooks/FetchData";
import Search from "./Search";
import UserCard from "../elements/UserCard";
import Button from "react-bootstrap/Button";
import Filter from "./Filter";

export default function UserData() {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [page, setPage] = useState(1); // Initialize page state
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [avail, setAvail] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  const renderUsers = () => {
    return filteredData.map((user) => (
      <UserCard
        key={user._id}
        id={user.id}
        fname={user.first_name}
        lname={user.last_name}
        email={user.email}
        gender={user.gender}
        avatar={user.avatar}
        domain={user.domain}
        available={user.available}
        fetchData={fetchData}
      />
    ));
  };

  const paginateUsers = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return renderUsers().slice(startIndex, endIndex);
  };

  return (
    <div>
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
        <Button onClick={() => handlePageChange(page + 1)}>{page + 1}</Button>
        <Button onClick={() => handlePageChange(page + 2)}>{page + 2}</Button>
      </div>
    </div>
  );
}
