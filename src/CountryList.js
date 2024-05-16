// src/components/CountryList.js

import React, { useState, useEffect } from 'react';
import './CountryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error.message);
        setError('Failed to fetch countries');
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="country-list">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        countries.map((country) => (
          <div key={country.name.common} className="country-card">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <span className="country-name">{country.name.common}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default CountryList;
