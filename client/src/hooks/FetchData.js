import axios from "axios";

const baseurl = "https://heliverse-server-2.onrender.com/";

export const Home = async (page, limit, fullName) => {
  try {
    const response = await axios.get(
      `${baseurl}api/users?page=${page}&limit=${limit}&fullname=${fullName}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const Attr = async () => {
  try {
    const response = await axios.get(`${baseurl}attribute`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const AllUser = async (fullName) => {
  try {
    const response = await axios.get(
      `${baseurl}api/allusers?fullname=${fullName}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const Teams = async () => {
  try {
    const response = await axios.get(`${baseurl}api/teams`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const DeleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${baseurl}api/users/${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

export const UpdateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${baseurl}api/users/${userId}`,
      userData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};
