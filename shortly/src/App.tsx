import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShorteningForm from './UrlShorteningForm'; 
import RedirectToBackend from './RedirectToBackend';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async (inputUrl: string) => {
	console.log("handling shorting");

    try {
      const response = await fetch('/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ inputField: encodeURIComponent(inputUrl) }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.text();
      setShortenedUrl(data);
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
        <h1>URL Shortener</h1>
        <Routes>
          <Route path="/" element={
            <UrlShorteningForm 
              onShorten={handleShorten} 
              onCopy={copyToClipboard} 
              shortenedUrl={shortenedUrl} 
              copied={copied}
            />
          } />
          <Route path="/:shortURL" element={<RedirectToBackend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

