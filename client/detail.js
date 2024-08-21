import React, { useState, useEffect } from 'react';

function Detail() {
  const [item, setItem] = useState({}); 
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items/:id'); 
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const method = isNew ? 'POST' : 'PUT'; 
      const response = await fetch(isNew ? '/api/items' : `/api/items/${item._id}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      setItem(data); 
      setIsNew(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/items/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setItem({}); // Clear the form
      setIsNew(true); 
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Detail Component</h2>
      <form>
        <input
          type="text"
          name="name"
          value={item.name || ''}
          onChange={handleChange}
          placeholder="Item Name"
        />
        <textarea
          name="description"
          value={item.description || ''}
          onChange={handleChange}
          placeholder="Item Description"
        />
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

export default Detail;

