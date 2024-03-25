import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

interface UrlShorteningFormProps {
  onShorten: (url: string) => void;
  onCopy: () => void;
  shortenedUrl: string;
  copied: boolean;
}

const UrlShorteningForm: React.FC<UrlShorteningFormProps> = ({ onShorten, onCopy, shortenedUrl, copied }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [validated, setValidated] = useState(false);

  const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp('^https?:\\/\\/'+ // protocol
                               '(([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+'+ // domain name
                               '[a-zA-Z]{2,}' + // top level domain
                               '(\\/[-a-zA-Z\\d%_.~+]*)*' + // path
                               '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
                               '(\\#[-a-zA-Z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
  };

  const handleShortenClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    
    if (isValidUrl(inputUrl)) {
      onShorten(inputUrl);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleShortenClick}>
        <Form.Group controlId="urlInput">
          <Form.Label>Enter the URL to shorten:</Form.Label>
          <Form.Control
            required
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter URL"
            isInvalid={validated && !isValidUrl(inputUrl)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid URL.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Shorten</Button>
      </Form>
      {shortenedUrl && (
        <Alert variant="success" className="mt-3">
          <Alert.Heading>Success! Here's your short URL:</Alert.Heading>
          <p>{shortenedUrl}</p>
          <Button variant="outline-success" onClick={onCopy}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </Alert>
      )}
    </>
  );
};

export default UrlShorteningForm;

