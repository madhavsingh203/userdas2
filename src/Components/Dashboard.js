import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
//import Table from './Table'
import TableCard from "./Table";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const fetchAPICall = async () => {
    try {
      const URL =
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
      const res = await axios.get(URL);
      let userData = res.data;
      //console.log(userData)
      setUsersData(userData);
      return userData;
    } catch (e) {
      if (e.res) {
        alert("something went wrong");
      } else {
        alert("make sure the backend is running");
      }
    }
  };

  useEffect(() => {
    fetchAPICall();
  }, []);

  //Search Term updation
  const handleSearch = (e) => {
    //console.log(e.target.value)

    setSearchData(e.target.value);
  };


  //handling search
  const handleSearchData = () => {
    const results = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchData.toLowerCase()) ||
        user.email.toLowerCase().includes(searchData.toLowerCase()) ||
        user.role.toLowerCase().includes(searchData.toLowerCase())
    );
    setSearchResults(results);
  };


  //handling debouncing
  let intervalId = 0;
  const debounceSearch = () => {
    clearInterval(intervalId);
    intervalId = setTimeout(() => {
      handleSearchData();
    }, 500);
    return intervalId;
  };

  useEffect(() => {
    debounceSearch();
  }, [searchData, usersData]);

  return (
    <>
      <TableCard
        usersData={searchResults}
        setUsersData={setUsersData}
        searchData={searchData}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default Dashboard;
