import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDatas, useScreenSize } from '../utils/customHooks';

import Note from '../components/note/Note';

import countries from '../assets/countries.json';

/**
 * Utility function to find the currency unit from an array of currencies and a given currency.
 * @param {Array<Object>} currencyArray The list of all the currencies on the site.
 * @param {number} currency The currency for which you want the currency unit.
 * @returns {string|null} Currency unit, or null if no match found.
 */
function findCurrencyUnit(currencyArray, currency) {
  const currencyMatch = currencyArray.find(
    (curr) => parseFloat(curr.rate) === parseFloat(currency)
  );
  return currencyMatch ? currencyMatch.currencyUnit : null;
}

/**
 * Function to round a number to two decimal places.
 * @param {number|string} number The number to be rounded.
 * @returns {string} The rounded number with two decimal places.
 */
function rounded(number) {
  return parseFloat(number)
    .toFixed(2)
    .replace(/\.?0+$/, '');
}

function Home() {
  // Fetching currency data using "useDatas" custom hook
  const { currency } = useDatas();

  // State to get the default habitual currency (Euro)
  const [EURRate, setEURRate] = useState(1);

  // Fetching screen width using "useScreenSize" custom hook
  const screenHeight = useScreenSize().height;

  // States for managing various aspects of the component's data
  // result: [tipCurrency, tipAmount, billAmount]
  const [result, setResult] = useState([]);
  // resultInHabitualCurrency: [billAmount, tipAmount]
  const [resultInHabitualCurrency, setResultInHabitualCurrency] = useState([]);
  // currencyUnit: [habitualCurrencyUnit, tipCurrencyUnitInForm, tipCurrencyUnitAfterResult]
  const [currencyUnit, setcurrencyUnit] = useState([]);

  const [habitualCurrency, setHabitualCurrency] = useState(1);
  const [NbPersons, setNbPersons] = useState(1);
  const [tipIndication, setTipIndication] = useState('');

  // Form handling using react-hook-form
  const form = useForm({ mode: 'onTouched' });
  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  useEffect(() => {
    const euroRate = currency.find((item) => item.code === 'EUR')?.rate;
    setEURRate(euroRate);
    setHabitualCurrency(euroRate);
  }, [currency, EURRate]);

  // useEffect to calculate the tip in the habitual currency when the habitual currency changes
  useEffect(() => {
    console.log('Taux de la devise habituelle : ', habitualCurrency);
    const exchangeRate = habitualCurrency / result[0];
    const billInHabitualCurrency = result[2] * exchangeRate;
    const tipInHabitualCurrency = result[1] * exchangeRate;

    setResultInHabitualCurrency([
      billInHabitualCurrency,
      tipInHabitualCurrency,
    ]);

    setcurrencyUnit((prevState) => [
      findCurrencyUnit(currency, habitualCurrency),
      prevState[1],
      prevState[2],
    ]);
  }, [habitualCurrency, result]);

  /** Function to handle form submission */
  const onSubmit = async (data) => {
    try {
      // Calculations based on form data
      const tip = data.bill * (data.percent / 100);

      // Updating currency units based on selected currencies
      setcurrencyUnit((prevState) => [
        prevState[0],
        findCurrencyUnit(currency, data.tipcurrency),
        findCurrencyUnit(currency, data.tipcurrency),
      ]);

      // Setting calculation results and number of persons
      setResult([data.tipcurrency, tip, data.bill]);
      setNbPersons(data.divide);
    } catch (error) {
      console.log(error);
    }
  };

  /** Function to handle change in tip currency selection */
  const tipCurrencyIndicationChange = (event) => {
    setcurrencyUnit((prevState) => [
      prevState[0],
      findCurrencyUnit(currency, event.target.value),
      prevState[2],
    ]);

    // Fetching tip indication (recommendation) based on selected currency
    const selectedCurrency =
      event.target.options[event.target.selectedIndex].text;

    const selectedTipIndication = countries.find(
      (country) => country.country === selectedCurrency.split(' (')[0]
    );

    if (selectedTipIndication) {
      setTipIndication(selectedTipIndication.indication);
      form.setValue(
        'percent',
        parseFloat(selectedTipIndication.indication.match(/\d+/)[0])
      );
    } else {
      setTipIndication('');
    }
  };

  const habitualCurrencyChange = (e) => {
    setHabitualCurrency(e.target.value);
  };

  return (
    <main className="homepage-main">
      <h1>Calculatrice de pourboire</h1>
      <Note
        direction={'vertical'}
        title="Information d'utilisation de la calcultatrice"
        openSetting={screenHeight > 1100 ? true : false}
      >
        Pour utiliser la calculatrice de pourboire, rien de plus simple :
        <ol>
          <li>
            Sélectionnez le{' '}
            <strong>pays où vous vous apprêtez à faire un pourboire</strong> :
            <Note direction="horizontal" openSetting={true}>
              Une fois choisie, une petite information, dans le même format que
              celle-ci, s’affichera en dessous pour vous conseiller sur le
              montant du pourboire.
            </Note>
          </li>
          <li>
            Indiquez le <strong>montant de l’addition</strong>.
          </li>
          <li>
            Indiquez le <strong>pourcentage</strong> de pourboire que vous
            souhaitez laisser.
          </li>
          <li>
            Indiquez le <strong>nombre de personnes</strong> si vous souhaitez
            partager le montant du pourboire.
          </li>
          <li>
            Cliquez sur le bouton <strong>&quot;Calculer&quot;</strong>.
          </li>
          <Note direction="horizontal" openSetting={true}>
            Une fois le calcul effectué, vous obtiendrez le montant du pourboire
            à laisser, ainsi que le montant total de l’addition dans votre
            devise habituelle. Par défaut, la{' '}
            <strong>devise habituelle est l’Euro (€)</strong>. Vous pouvez
            changer cette devise dans le menu déroulant.
          </Note>
        </ol>
      </Note>
      <section className="calculatorblock">
        <form
          className="formcalculator"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label htmlFor="tipcurrency">
            Pays dans lequel vous vous situez
            <select
              id="tipcurrency"
              {...register('tipcurrency', {
                required: {
                  value: true,
                  message:
                    'Le champ "Pays dans lequel vous vous situez" est obligatoire',
                },
                valueAsNumber: true,
              })}
              required
              onChange={tipCurrencyIndicationChange}
            >
              <option value="">-- Choisissez une option --</option>
              {currency.map((cur, i) => (
                <option key={i} value={cur.rate}>
                  {cur.country} ({cur.code})
                </option>
              ))}
            </select>
            <p className="error">{errors.tipcurrency?.message}</p>
          </label>

          {/* Displaying tip indication if available */}
          {tipIndication && (
            <Note
              direction={'horizontal'}
              title="Indication sur la culture du pourboire"
              openSetting={true}
            >
              {tipIndication}
            </Note>
          )}
          <div className="fd-row">
            <label htmlFor="bill">
              Montant de l&apos;addition
              <div className="input-and-unit">
                <span>{currencyUnit[1] ? currencyUnit[1] : '€'}</span>
                <input
                  type="number"
                  id="bill"
                  {...register('bill', {
                    required: {
                      value: true,
                      message:
                        'Le champ "Montant de l\'addition" est obligatoire',
                    },
                    min: {
                      value: 1,
                      message:
                        "La valeur de l'addition doit être supérieure ou égale à 1",
                    },
                    valueAsNumber: true,
                  })}
                  required
                  defaultValue={100}
                  step={0.01}
                  min={1}
                />
              </div>
              <p className="error">{errors.bill?.message}</p>
            </label>
            <label htmlFor="percent">
              Pourcentage
              <div className="input-and-unit">
                <span>%</span>
                <input
                  type="number"
                  id="percent"
                  {...register('percent', {
                    required: {
                      value: true,
                      message: 'Le champ "pourcentage" est obligatoire',
                    },
                    min: {
                      value: 0,
                      message:
                        'La valeur du pourcentage doit être supérieure ou égale à 0',
                    },
                    max: 100,
                    valueAsNumber: true,
                  })}
                  required
                  defaultValue={15}
                  step={0.01}
                  min={0}
                  max={100}
                />
              </div>
              <p className="error">{errors.percent?.message}</p>
            </label>
            <label htmlFor="divide">
              Nombre de personnes
              <input
                type="number"
                id="divide"
                {...register('divide', {
                  required: {
                    value: true,
                    message: 'Le champ "nombre de personnes" est obligatoire',
                  },
                  min: {
                    value: 1,
                    message:
                      'Le nombre de personnes doit être supérieure ou égale à 1',
                  },
                  max: {
                    value: 100,
                    message:
                      'Le nombre de personnes doit être inférieur ou égale à 100',
                  },
                  valueAsNumber: true,
                })}
                required
                defaultValue={1}
                min={1}
                max={100}
              />
              <p className="error">{errors.divide?.message}</p>
            </label>
          </div>
          <div className="center">
            <button type="submit" disabled={!isValid}>
              Calculer
            </button>
          </div>
        </form>
      </section>
      {/* Displaying results */}
      {result[0] != null && (
        <section className="results">
          <h2>Résultats</h2>
          <div className="tables">
            <div className="table result-in-tip-curr">
              <h3>Montant du pourboire</h3>
              <p className="result">
                <strong>
                  {rounded(result[1])}
                  {currencyUnit[2]}
                </strong>
              </p>
              {/* Displaying tip per person if more than one person */}
              {NbPersons > 1 && (
                <>
                  <p className="dividedTipTitle">Par personne</p>
                  <p className="result">
                    <strong>
                      {rounded(result[1] / NbPersons)}
                      {currencyUnit[2]}
                    </strong>
                  </p>
                </>
              )}
            </div>
            {result[0] !== habitualCurrency && (
              <div className="table">
                <h3>Dans votre devise</h3>
                <select
                  name="habitualCurrency"
                  id="habitualCurrency"
                  onChange={habitualCurrencyChange}
                  value={habitualCurrency}
                >
                  {currency
                    .filter(
                      (objet, index, self) =>
                        index === self.findIndex((o) => o.code === objet.code)
                    )
                    .sort((a, b) =>
                      a.code === 'EUR'
                        ? -1
                        : b.code === 'EUR'
                        ? 1
                        : a.code && b.code
                        ? a.code.localeCompare(b.code)
                        : 0
                    )
                    .map((cur, i) => (
                      <option key={i} value={cur.rate}>
                        {cur.currencyUnit} ({cur.code})
                      </option>
                    ))}
                </select>
                <p className="result">
                  {rounded(resultInHabitualCurrency[1])}
                  {currencyUnit[0]}
                </p>
                {/* Displaying tip per person if more than one person */}
                {NbPersons !== 1 && (
                  <>
                    <p className="dividedTipTitle">Par personne</p>
                    <p className="result">
                      {rounded(resultInHabitualCurrency[1] / NbPersons)}
                      {currencyUnit[0]}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Displaying bill amount in habitual currency if different from tip currency */}
          {result[0] !== habitualCurrency && (
            <Note
              direction={'horizontal'}
              title="Indication sur le montant de votre addition dans votre devise habituelle"
              openSetting={true}
            >
              Dans votre devise, le montant de l&apos;addition vaut{' '}
              <strong>
                {rounded(resultInHabitualCurrency[0])}
                {currencyUnit[0]}
              </strong>
              .
            </Note>
          )}
        </section>
      )}

      {/* Section for adding a new country */}
      <section className="countryask">
        <p>
          Il manque votre pays ? Sélectionnez-le, nous l&apos;ajouterons avec
          plaisir !
        </p>
        <div className="center">
          <Link to="/informations#website-improvement" className="redirect">
            Je veux ajouter un pays !
          </Link>
        </div>
        <img
          src="/Coffee-shop-pana.svg"
          alt="Deux personnes assises à une table buvant du café dans un Coffee Shop."
          className="coffee-shop-cover"
        />
      </section>
    </main>
  );
}

export default Home;
