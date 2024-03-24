import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RedirectToBackend: React.FC = () => {
  const { shortURL } = useParams<{ shortURL: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/${shortURL}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the backend');
        }
	const redirectUrl = await response.text();
	const decodeUrl = decodeURIComponent(redirectUrl);
	window.location.href = decodeUrl;

      } catch (error) {
        console.error('Error occurred while fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortURL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default RedirectToBackend;

