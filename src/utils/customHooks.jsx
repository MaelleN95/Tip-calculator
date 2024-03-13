import { useEffect, useState } from 'react';
import countries from '../assets/countries.json';

// Custom hook to fetch and manage currency data
export function useDatas() {
  // State to store currency data
  const [currency, setCurrency] = useState([]);
  // State to store fetched data
  const [datas, setDatas] = useState({});

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const res = await fetch('https://cdn.taux.live/api/latest.json');
      if (!res.ok) {
        throw new Error('Failed to fetch datas');
      }
      const jsonData = await res.json();
      // Logging last update date
      console.log('Last update : ', jsonData.lastupdate);
      // Setting fetched data
      return setDatas(jsonData.rates);
    } catch (error) {
      console.error('Error fetching datas :', error);
    }
  };

  // Function to update currency data based on fetched data
  const updateDatas = () => {
    try {
      // Extracting country codes from countries.json
      const countryCodes = countries.map((country) => country.code);

      // Filtering fetched data based on country codes
      const filteredDatas = Object.entries(datas).filter(([code]) =>
        countryCodes.includes(code)
      );

      // Mapping filtered data to match country data structure
      const filteredRates = countries.map((country) => {
        const foundData = filteredDatas.find(
          (filteredData) => filteredData[0] === country.code
        );
        return {
          country: country.country,
          code: country.code,
          rate: foundData ? foundData[1] : null,
          currencyUnit: country.currencyUnit,
        };
      });

      // Setting updated currency data
      return setCurrency(filteredRates);
    } catch (error) {
      console.error('Error when updating datas :', error);
    }
  };

  // Fetching data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Updating currency data when datas state changes
  useEffect(() => {
    updateDatas();
  }, [datas]);

  // Return currency data for components can use them
  return { currency };
}
