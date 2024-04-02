import React, { useEffect, useState } from "react";
import { Home } from "../hooks/FetchData";
import UserCard from "../elements/UserCard";
import Search from "./Search";
import Button from "react-bootstrap/Button";
import Filter from "./Filter";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(1000);
  const [fullName, setFullName] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [avail, setAvail] = useState("");

  useEffect(() => {
    fetchData();
  }, [page]); // Fetch data when page changes

  const fetchData = async () => {
    try {
      const responseData = await Home(page, 10, fullName); // Pass the page number to the API request
      setUsers(responseData.users); // Replace the existing list with the new list
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLoadMore = async () => {
    if (page !== Math.floor(length / 10)) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage(1);
    } // Increment page number to fetch the next page
    await handleFilter();
  };
  const handleChange = async (e) => {
    const fullName = e.target.value;
    setFullName(fullName); // Update fullName state

    setPage(1); // Reset page number to 1 when filtering
    try {
      const responseData = await Home(1, 10, fullName);
      setUsers(responseData.users); // Update users state with filtered users
      setLength(responseData.length);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  const handleFilter = async (e) => {
    try {
      let filterDomain = "";
      let filterGender = "";
      let filterAvail = "";

      // Extract the values from the event target's options
      if (e.target.id === "domain") {
        filterDomain = e.target.options[e.target.selectedIndex].text;
      } else if (e.target.id === "gender") {
        filterGender = e.target.options[e.target.selectedIndex].text;
      } else if (e.target.id === "avail") {
        filterAvail = e.target.value;
      }

      // Fetch users from the backend based on the updated filter criteria
      const responseData = await Home(page, 10, fullName);

      // Apply filtering based on domain, gender, and avail
      let filteredData = responseData.users;

      if (filterDomain) {
        filteredData = filteredData.filter(
          (user) => user.domain === filterDomain
        );
      }
      if (filterGender) {
        filteredData = filteredData.filter(
          (user) => user.gender === filterGender
        );
      }
      if (filterAvail !== "") {
        filteredData = filteredData.filter(
          (user) => `${user.available}` === filterAvail
        );
      }

      setUsers(filteredData); // Update users state with filtered users
      setLength(responseData.length);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  const handleLoadBack = async () => {
    console.log("prev");
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      setPage(Math.floor(length / 10) + 1);
    }
    await handleFilter();
  };
  return (
    <div className="team-select">
      <div>
        <Search onChange={handleChange} />
        <Filter onChange={handleFilter} />
        <div className="user-line">
          {users.map((i) => {
            return (
              <UserCard
                key={i._id}
                id={i.id}
                fname={i.first_name}
                lname={i.last_name}
                email={i.email}
                gender={i.gender}
                avatar={i.avatar}
                domain={i.domain}
                available={i.available}
              />
            );
          })}
        </div>
        <div className="load-more">
          {[...Array(2)].map((_, index) => {
            const pageNumber = page + index - 2;
            if (pageNumber > 0) {
              return (
                <Button onClick={() => handleLoadBack()}>{pageNumber}</Button>
              );
            }
            return null;
          })}

          <Button variant="secondary">{page}</Button>
          {[...Array(2)].map((_, index) => {
            const pageNumber = page + index + 1;
            if (pageNumber < Math.floor(length / 10)) {
              return (
                <Button onClick={() => handleLoadMore()}>{pageNumber}</Button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
