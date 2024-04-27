import { useEffect, useState } from 'react';
import countries from '../assets/countries.json';

// Function to fetch data from API
const fetchData = async () => {
  try {
    const res = await fetch('https://cdn.taux.live/api/latest.json');
    if (!res.ok) {
      throw new Error('Failed to fetch datas');
    }
    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching datas :', error);
  }
};

// Function to transform data to match countries data
const transformData = (countries, APIdata) => {
  return countries.map((country) => {
    const foundData = Object.entries(APIdata).find(
      ([code]) => code === country.code
    );
    return {
      country: country.country,
      code: country.code,
      rate: foundData ? foundData[1] : null,
      currencyUnit: country.currencyUnit,
    };
  });
};

// Custom hook to fetch and manage currency data
export function useDatas() {
  // State to store currency data
  const [currency, setCurrency] = useState([]);

  // Function to fetch data from API
  const fetchDataAndUpdate = async () => {
    try {
      const jsonData = await fetchData();
      console.log(
        'The data is now up to date : ',
        new Date(jsonData.lastupdate)
      );

      const transformedData = transformData(countries, jsonData.rates);

      setCurrency(transformedData);
      localStorage.setItem('currencyData', JSON.stringify(jsonData));
    } catch (error) {
      console.error('Error fetching datas :', error);
    }
  };

  // Function to check if data is in localStorage and update if needed
  const checkStorageAndUpdate = () => {
    const storedData = localStorage.getItem('currencyData');
    if (storedData) {
      const parsedStoredData = JSON.parse(storedData);
      const lastUpdate = new Date(parsedStoredData.lastupdate);
      const currentDate = new Date();
      if (
        lastUpdate.getFullYear() === currentDate.getFullYear() &&
        lastUpdate.getMonth() === currentDate.getMonth() &&
        lastUpdate.getDate() === currentDate.getDate()
      ) {
        setCurrency(transformData(countries, parsedStoredData.rates));
        console.log('Data is up to date.');
        console.log('Last update : ', lastUpdate);
        return;
      }
    }
    // If data is not in sessionStorage or needs update, fetch and update
    fetchDataAndUpdate();
  };

  // Fetching data on initial render
  useEffect(() => {
    checkStorageAndUpdate();
  }, []);

  // Return currency data for components can use them
  return { currency };
}

// Custom hook to manage screen size
export function useScreenSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
