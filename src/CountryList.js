import React, { useState, useEffect } from 'react';
import './CountryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error.message);
        setError('Failed to fetch countries');
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="country-list">
      <input
        type="text"
        className="search-input"
        placeholder="Search Country..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="country-cards-container">
          {filteredCountries.map((country) => (
            <div key={country.name.common} className="countryCard">
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                className="country-flag"
              />
              <span className="country-name">{country.name.common}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;
