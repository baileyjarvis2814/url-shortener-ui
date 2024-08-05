import React, { useEffect, useState } from 'react';
import UrlForm from '../UrlForm/UrlForm';
import UrlContainer from '../UrlContainer/UrlContainer';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .then(data => setUrls(data.urls))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addNewUrl = (newUrl) => {
    setUrls(prevUrls => [...prevUrls, newUrl]);
  };

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm onNewUrl={addNewUrl} />
      </header>
      <UrlContainer urls={urls} />
    </main>
  );
}

export default App;
