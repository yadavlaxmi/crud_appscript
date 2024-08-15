import React, { useState } from 'react';
import axios from 'axios';

function App() {
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    designation: '',
    salary: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const API_URL = 'https://sheet.best/api/sheets/3523a7d3-8739-4b9e-8a18-4ece0f82f35e';

    try {
      const response = await axios.post(API_URL, formData);
      setResponseMessage(response.data.message);
      console.log('Form Data Submitted:', formData);

      setFormData({
        name: '',
        age: '',
        designation: '',
        salary: ''
      });
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Employee Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Designation:
            <input
              type="text"
              name="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
              style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Salary:
            <input
              type="number"
              name="Salary"
              value={formData.salary}
              onChange={handleChange}
              required
              style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Submit
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
