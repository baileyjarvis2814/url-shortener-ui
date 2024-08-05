import React, { useState } from 'react';

function UrlForm({ onNewUrl }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title || !urlToShorten) {
      setError('Both fields are required.');
      return;
    }

    const response = await fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ long_url: urlToShorten, title })
    });

    if (response.ok) {
      const newUrl = await response.json();
      onNewUrl(newUrl);
      clearInputs();
      setError('');
    } else {
      setError('Failed to shorten URL');
    }
  };

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  };

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Shorten Please!
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default UrlForm;
