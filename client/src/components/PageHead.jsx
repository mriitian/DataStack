import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Users from "./Users";
import Teams from "./Teams";
import UserData from "./UserData";

export default function PageHead() {
  return (
    <div>
      <h2 style={{ color: "white", textAlign: "center", padding: "20px 5px" }}>
        Users Data
      </h2>
      <div className="data-container">
        <Tabs
          defaultActiveKey="users"
          id="animated-tab-example"
          className="mb-3"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Tab eventKey="users" title="Home">
            <UserData />
          </Tab>
          <Tab eventKey="teams" title="Teams">
            <Teams />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
