import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'react-bootstrap/Pagination';
import { MdDelete } from "react-icons/md";
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';  // Import PapaParse for CSV parsing
import './App.css';

const View = () => {
  const [register, setregister] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/register');
        setregister(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/register/${id}`);
      setregister(register.filter((item) => item._id !== id));
      setAlertMessage('Record deleted successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertMessage('Error deleting record. Please try again.');
      setShowAlert(true);
    }
  };



  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = register.slice(indexOfFirstRecord, indexOfLastRecord);

  const filteredRecords = currentRecords.filter((registers) =>
    registers.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    registers.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(register.length / recordsPerPage);
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "mobile" },
    { label: "City", key: "city" },
    { label: "Nationality", key: "nationality" },
    { label: "Qualification", key: "qualification" },
    { label: "Position", key: "position" },
    { label: "Gender", key: "gender" }
  ];

  return (
    <div className='p-5 text-center'>
      <h4>Registration List</h4>
      <hr/>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <input
        type="text"
        placeholder="Search by Name or Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      <div className="text-left">
        <CSVLink headers={headers} data={register} filename={"registration-data.csv"} className="text-left btn btn-danger mb-3">
          Download CSV
        </CSVLink>

        
      </div>

      <Table responsive="sm" striped bordered hover size="sm" variant="light" className='text-center'>
        <thead>
          <tr>
            <th className='bg-primary text-light'>Name</th>
            <th className='bg-primary text-light'>Email</th>
            <th className='bg-primary text-light'>Mobile</th>
            <th className='bg-primary text-light'>City</th>
            <th className='bg-primary text-light'>Nationality</th>
            <th className='bg-primary text-light'>Qualification</th>
            <th className='bg-primary text-light'>Position</th>
            <th className='bg-primary text-light'>Gender</th>
            <th className='bg-primary text-light'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((registers, index) => (
            <tr key={index}>
              <td>{registers.name}</td>
              <td>{registers.email}</td>
              <td>{registers.mobile || "Data Not Available"}</td>
              <td>{registers.city || "Data Not Available"}</td>
              <td>{registers.nationality || "Data Not Available"}</td>
              <td>{registers.qualification || "Data Not Available"}</td>
              <td>{registers.position}</td>
              <td>{registers.gender}</td>
              <td>
                <MdDelete
                  className='text-danger'
                  style={{ cursor: 'pointer',fontSize:"19px" }}
                  onClick={() => handleDelete(registers._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default View;
