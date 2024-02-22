// MongoDataComponent.js

import React, { useState, useEffect } from 'react';

const MongoDataComponent = () => {
  // State to store the fetched data
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('/api/items') // Update the URL based on your server setup
      .then((response) => response.json())
      .then((data) => {
        // Store the data in the state
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts
  console.log(`Items: ${items}`)

  return (
    <div>
      <h1>MongoDB Data:</h1>
      <div>
        {items}
      </div>
    </div>
  );
};

export default MongoDataComponent;
