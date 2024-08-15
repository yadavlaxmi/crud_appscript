import React, { useState,useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://docs.google.com/spreadsheets/d/1O7rcCa9CZ_JwX-ReSpMCKtgJ9v8cZWWZ4hAttl0FZ6M'; 

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit for Create/Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        // Update operation
        await axios.put(API_URL, formData);
      } else {
        // Create operation
        await axios.post(API_URL, formData);
      }
      fetchData();
      setFormData({ id: '', name: '', email: '' });
      setResponseMessage('Operation successful');
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  // Handle Delete Operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL, { data: { id } });
      fetchData();
      setResponseMessage('Record deleted');
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  // Handle Edit Operation
  const handleEdit = (row) => {
    setFormData({ id: row[0], name: row[1], email: row[2] });
  };

  return (
    <div>
      <h1>Google Sheets CRUD with React</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      <ul>
        {data.map((row) => (
          <li key={row[0]}>
            {row[1]} ({row[2]}){' '}
            <button onClick={() => handleEdit(row)}>Edit</button>{' '}
            <button onClick={() => handleDelete(row[0])}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
