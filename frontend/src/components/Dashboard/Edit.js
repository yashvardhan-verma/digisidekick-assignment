import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;


  const [EditData, setEditData] = useState(selectedEmployee);

  const { _id, name, email, mobile, age, address } = EditData;

  const handleUpdate = async e => {
    e.preventDefault();
    const { name, email, mobile, age, address } = EditData;

    if (!name || !mobile || !email) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
    console.log(EditData, 'editdata')

    const result = await axios.patch(`http://localhost:4000/users/${_id}`, { name, email, mobile, age, address });
    // setEmployees(result.data.data)

    // const employee = { name, email, mobile, age, address };

    // for (let i = 0; i < EditData.length; i++) {
    //   if (EditData[i]._id === id) {
    //     EditData.splice(i, 1, employee);
    //     break;
    //   }
    // }

    // localStorage.setItem('employees_data', JSON.stringify(employees));
    // setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${EditData.name} 's data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData({ ...EditData, [name]: value })
  }

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={EditData?.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={EditData?.email}
          onChange={handleInputChange}
        />

        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={EditData?.mobile}
          onChange={handleInputChange}
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={EditData?.age}
          onChange={handleInputChange}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={EditData?.address}
          onChange={handleInputChange}
        />



        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
