import React, { useEffect, useState } from 'react';
import './UrlContainer.css';

const UrlContainer = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .then(data => setUrls(data.urls))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const urlEls = urls.map((url, index) => (
    <div className="url" key={index}>
      <h3>{url.title}</h3>
      <a href={url.short_url} target="_blank" rel="noopener noreferrer">{url.short_url}</a>
      <p>{url.long_url}</p>
    </div>
  ));

  return (
    <section>
      {urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p>}
    </section>
  );
};

export default UrlContainer;
