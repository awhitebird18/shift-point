import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import styles from "./EmployeeAccess.module.css";
import { Menu } from "antd";
import EmployeeList from "./EmployeeList";
import DepartmentList from "./DepartmentList";
import { useFetch } from "../../../../hooks";

const EmployeeAccess = ({ currentUser, setCurrentUser }) => {
  const [departments] = useFetch("department");
  const [employees] = useFetch("employee");
  const [current, setCurrent] = useState("departmentList");
  const [costCentres] = useFetch("costcentre");

  const handleClick = ({ key }) => {
    setCurrent(key);
  };

  if (!departments || !employees || !costCentres) return <></>;

  return (
    <>
      <div className={styles.header}>
        <Menu
          onClick={handleClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ borderBottom: "none" }}
        >
          <Menu.Item key="departmentList">
            <Link to="">Departments</Link>
          </Menu.Item>
          <Menu.Item key="employeeList">
            <Link to="employeeList">Assigned Employees</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route
            path="/"
            element={
              <DepartmentList
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                departments={departments}
                costCentres={costCentres}
              />
            }
          />
          <Route
            path="employeeList"
            element={
              <EmployeeList
                departments={departments}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                employees={employees}
                costCentres={costCentres}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default EmployeeAccess;
