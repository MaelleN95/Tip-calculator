import { useEffect, useState } from 'react';
import countries from '../assets/countries.json';

export function useDatas() {
  const [currency, setCurrency] = useState([]);
  const [datas, setDatas] = useState({});

  const fetchData = async () => {
    try {
      const res = await fetch('https://cdn.taux.live/api/latest.json');
      if (!res.ok) {
        throw new Error('Failed to fetch datas');
      }
      const jsonData = await res.json();
      console.log('Last update : ', jsonData.lastupdate);
      return setDatas(jsonData.rates);
    } catch (error) {
      console.error('Error fetching datas :', error);
    }
  };

  const updateDatas = () => {
    try {
      const countryCodes = countries.map((country) => country.code);

      const filteredDatas = Object.entries(datas).filter(([code]) =>
        countryCodes.includes(code)
      );

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

      return setCurrency(filteredRates);
    } catch (error) {
      console.error('Error when updating datas :', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateDatas();
  }, [datas]);

  return { currency };
}
