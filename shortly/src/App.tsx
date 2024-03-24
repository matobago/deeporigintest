import React, { useState } from 'react';
import { FiLink } from 'react-icons/fi'; 
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'; 
import './App.css'; 
import RedirectToBackend from './RedirectToBackend';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    try {
      const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ inputField: encodeURIComponent(inputUrl) }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.text();
      const shortenedUrl = `${data}`;
      setShortenedUrl(shortenedUrl);
    } catch (error) {
      console.error('Error occurred while shortening URL:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
  };

  return (
    <Router> 
      <div className="App">
        <h1>URL Shortener <FiLink /></h1>
        <Routes>
          <Route path="/" element={
            <div>
              <p>Enter the URL to shorten:</p>
              <div className="input-container">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Enter URL"
                />
                <button onClick={handleShorten}>Shorten</button>
              </div>
              {shortenedUrl && (
                <div className="success-message">
                  <p>Success! Here's your short URL:</p>
                  <div className="shortened-url">{shortenedUrl}</div>
                  <button onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy to Clipboard'}</button>
                </div>
              )}
            </div>
          } />
  	  <Route path="/:shortURL" element={<RedirectToBackend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

