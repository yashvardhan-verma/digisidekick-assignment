import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

// import { employeesData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [EditData, setEditData] = useState({});


  useEffect(() => {

 
    getUsers()
  }, [isEditing])

  const getUsers = async () => {
    const result = await axios.get('http://localhost:4000/users');
    setEmployees(result.data.data)
  }


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employees_data'));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const handleEdit = async (employee) => {
    // const result = await axios.patch(`http://localhost:4000/users/${_id}`, { name, email, mobile, age, address });
    // setEmployees(result.data.data)

    // const [employee] = employees.filter(employee => employee.id === id);

    // setSelectedEmployee(employee);
    setIsEditing(true);
    setEditData(employee)
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.value) {
        // const [employee] = employees.filter(employee => employee.id === id);

        const result = await axios.delete(`http://localhost:4000/users/${id}`);
        if (result.data.data) {


          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            // text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          getUsers()
        }
        // const employeesCopy = employees.filter(employee => employee.id !== id);
        // localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        // setEmployees(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={EditData}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
