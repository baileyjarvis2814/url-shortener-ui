import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls }) => {
  const validUrls = Array.isArray(urls) ? urls : [];

  const urlEls = validUrls.map((url, index) => (
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
